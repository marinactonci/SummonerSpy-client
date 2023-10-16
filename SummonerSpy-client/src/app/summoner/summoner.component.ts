import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {SharedService} from "../services/shared.service";
import {Region} from "../models/region.model";
import {regions, champions} from "../utils/constants";
import {FirebaseService} from "../services/firebase.service";
@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit{
  isLoading: boolean = false;
  isLoadingMore: boolean = false;
  selectedRegion: Region;
  summonerName: string;
  summoner: any;
  champions: any = champions;

  start: number = 0;
  count: number = 6;

  matchIds: any;
  matches: any[] = [];
  rankedStats: any;
  rankedSolo: any;
  hasRankSolo: boolean = false;
  rankedFlex: any;
  hasRankFlex: boolean = false;
  masteryPoints: any;
  isWin: boolean;
  isSummonerFound: boolean = true;

  isLoggedIn: boolean = false;
  user: any;
  isFavorite: boolean = false;
  isAddedToProfile: boolean = false;
  isAddToProfileVisible: boolean = false;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private shared: SharedService,
              private firebase: FirebaseService) { }

  async ngOnInit() {
    this.shared.onLandingPageLoad(false);
    this.route.params.subscribe(async params => {
      this.isLoading = true;
      this.resetVariables();

      this.summonerName = params['summonerName'];
      this.selectedRegion = regions.find(region => region.shorthand === this.route.snapshot.params['regionCode']);
      await this.getSummonerData();
      await this.userStatus();
      await this.getProfileAccout();

      this.isLoading = false;
    });
  }

  async getSummonerData() {
    let response = await this.api.getSummoner(this.selectedRegion.code, this.summonerName);
    if (Object.keys(response).length === 0) {
      this.isLoading = false;
      this.isSummonerFound = false;
      return;
    }
    this.summoner = response;
    this.rankedStats = await this.api.getRankPoints(this.selectedRegion.code, this.summoner.id);
    this.rankedSolo = {};
    this.rankedFlex = {};



    for (let item of this.rankedStats) {
      if (item.queueType === 'RANKED_SOLO_5x5') {
        this.rankedSolo = item;
      } else if (item.queueType === 'RANKED_FLEX_SR') {
        this.rankedFlex = item;
      }

      if (this.rankedSolo.tier) this.hasRankSolo = true;
      if (this.rankedFlex.tier) this.hasRankFlex = true;
      if (this.hasRankSolo) this.rankedSolo.winrate = Math.round((this.rankedSolo?.wins / (this.rankedSolo?.wins + this.rankedSolo?.losses)) * 100);
      if (this.hasRankFlex) this.rankedFlex.winrate = Math.round((this.rankedFlex?.wins / (this.rankedFlex?.wins + this.rankedFlex?.losses)) * 100);
    }

    this.masteryPoints = await this.api.getMasteryPoints(this.selectedRegion.code, this.summoner.puuid);

    await this.loadMatches();
  }

  async loadMatches() {
    this.matchIds = await this.api.getAllMatches(this.selectedRegion.majorRegion, this.summoner.puuid, this.start.toString(), this.count.toString());

    for (let i = 0; i < this.matchIds.length; i++) {
      const singleMatch: any = await this.api.getMatch(this.selectedRegion.majorRegion, this.matchIds[i]);
      for (let participant of singleMatch.info.participants) {
        if (participant.puuid === this.summoner.puuid) {
          singleMatch.info.isWin = participant.win;
        }
      }
      this.matches.push(singleMatch);
    }
  }

  async refresh() {
    this.isLoading = true;
    this.resetVariables();
    await this.getSummonerData();
    this.isLoading = false;
  }

  resetVariables() {
    this.summoner = {};
    this.start = 0;
    this.count = 6;
    this.matchIds = [];
    this.matches = [];
    this.rankedSolo = {};
    this.rankedFlex = {};
    this.hasRankSolo = false;
    this.hasRankFlex = false;
    this.isFavorite = false;
  }

  consoleLogEverything() {
    console.log("NEW CONSOLE LOGS");
    console.log(this.start);
    console.log(this.count);
    console.log(this.matchIds);
    console.log(this.matches);
  }

  async loadMoreMatches() {
    this.isLoadingMore = true;
    this.matchIds = {};
    this.start += this.count;
    await this.loadMatches();
    this.isLoadingMore = false;
  }

  async userStatus() {
    const result = await this.firebase.userStatus();
    if (result) {
      this.isLoggedIn = true;
      this.user = result;
      // check if summoner is in favorites
      const favorites: any = await this.firebase.getFavorites(this.user.uid);
      if (favorites && favorites.favorites && !favorites.error) {
        for (let favorite of favorites.favorites) {
          if (favorite.name === this.summoner.name && favorite.region === this.selectedRegion.code) {
            this.isFavorite = true;
          }
        }
      }
    } else {
      this.isLoggedIn = false;
      this.user = {};
    }
  }

  async toggleFavorite() {
    if (!this.isFavorite) {
      this.isFavorite = true;
      await this.firebase.addToFavorites(this.user.uid, this.selectedRegion.code, this.summoner.name);
    }
    else {
      this.isFavorite = false;
      await this.firebase.removeFromFavorites(this.user.uid, this.selectedRegion.code, this.summoner.name);
    }
  }

  async getProfileAccout() {
    const result: any = await this.firebase.getProfileAccount(this.user.uid);
    if (result && !result.message) {
      this.isAddedToProfile = true;
      if (this.summoner.name === result.name) this.isAddToProfileVisible = true;
      else this.isAddToProfileVisible = false;
    } else {
      this.isAddToProfileVisible = true;
      this.isAddedToProfile = false;
    }
  }

  async addToProfile() {
    this.isAddedToProfile = true;
    await this.firebase.addProfileAccount(this.user.uid, this.selectedRegion.shorthand, this.summoner.name);
    this.shared.onRemoveFromProfile(false);
  }

  async removeFromProfile() {
    this.isAddedToProfile = false;
    await this.firebase.removeProfileAccount(this.user.uid);
    this.shared.onRemoveFromProfile(true);
  }
}
