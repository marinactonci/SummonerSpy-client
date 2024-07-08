import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {regions} from "../utils/constants";
import {Region} from "../models/region.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  user: any;
  favorites: any[] = [];
  favoriteSummoners:
    {
      name: string,
      level: number,
      region: string,
      code: string,
      icon: string,
      profileAccount: any,
      soloRank?: {
        tier: string,
        rank: string,
        points: number
      },
      flexRank?: {
        tier: string,
        rank: string,
        points: number
      },
    }[] = [];
  profileAccount: any;

  constructor(private shared: SharedService,
              private firebase: FirebaseService,
              private router: Router,
              private api: ApiService) {}

  async ngOnInit() {
    this.shared.onLandingPageLoad(false);
    this.isLoading = true;
    const result = await this.firebase.userStatus();

    if (result) {
      this.isLoggedIn = true;
      this.user = result;
      await this.loadFavorites();
    } else {
      this.isLoading = false;
      this.isLoggedIn = false;
      this.user = null;
      return;
    }

    this.isLoading = false;
  }

  async loadFavorites() {
    await this.getProfileAccount();
    const favorites: any = await this.firebase.getFavorites(this.user.uid);
    if (favorites) {
      if (favorites.favorites) this.favorites = favorites.favorites;
      else this.favorites = [];

      if (this.favorites.length) {
        for (let summoner of this.favorites) {
          const favoriteSummoner: any = {};
          favoriteSummoner.name = summoner.name;
          const region: any = regions.find(region => region.code === summoner.region);
          favoriteSummoner.region = region.shorthand;
          favoriteSummoner.code = region.code;

          if (this.profileAccount !== null) {
            if (favoriteSummoner.region === this.profileAccount.region && favoriteSummoner.name === this.profileAccount.name)
              favoriteSummoner.profileAccount = this.profileAccount;
            else favoriteSummoner.profileAccount = null;
          }

          const summonerResponse = await this.api.getSummoner(summoner.region, summoner.name);
          favoriteSummoner.icon = summonerResponse.profileIconId;
          favoriteSummoner.level = summonerResponse.summonerLevel;
          const rankPointsResponse = await this.api.getRankPoints(summoner.region, summonerResponse.id);
          const rankSolo = rankPointsResponse.find((rank: any) => rank.queueType === 'RANKED_SOLO_5x5');
          const rankFlex = rankPointsResponse.find((rank: any) => rank.queueType === 'RANKED_FLEX_SR');
          if (rankSolo !== undefined) {
            favoriteSummoner.soloRank = {
              tier: rankSolo.tier,
              rank: rankSolo.rank,
              points: rankSolo.leaguePoints
            };
          }
          if (rankFlex !== undefined) {
            favoriteSummoner.flexRank = {
              tier: rankFlex.tier,
              rank: rankFlex.rank,
              points: rankFlex.leaguePoints
            };
          }
          this.favoriteSummoners.push(favoriteSummoner);
        }
      }
    }
  }

  login() {
    this.router.navigateByUrl('/login').then(r => console.log(r));
  }

  openSummoner(region: string, name: any) {
    const url: string = `summoners/${region}/${name}`;
    this.router.navigateByUrl(url).then(r => console.log(r));
  }

  async getProfileAccount() {
    const result: any = await this.firebase.getProfileAccount(this.user.uid);
    if (result && !result.message) {
      this.profileAccount = result;
    } else {
      this.profileAccount = null;
    }
  }

  async addToProfile(favoriteSummoner: any) {
    await this.firebase.addProfileAccount(this.user.uid, favoriteSummoner.region, favoriteSummoner.name);
    await this.getProfileAccount();
    favoriteSummoner.profileAccount = this.profileAccount;
    this.shared.onRemoveFromProfile(false);
  }

  async removeFromProfile(favoriteSummoner: any) {
    this.profileAccount = null;
    favoriteSummoner.profileAccount = null;
    await this.firebase.removeProfileAccount(this.user.uid);
    this.shared.onRemoveFromProfile(true);
  }

  async removeFavorite(region: string, name: string, ) {
    this.isLoading = true;
    this.favorites = [];
    this.favoriteSummoners = [];
    await this.firebase.removeFromFavorites(this.user.uid, region, name);
    await this.loadFavorites();
    this.isLoading = false;
  }
}
