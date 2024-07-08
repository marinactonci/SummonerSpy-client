import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";
import {ApiService} from "../services/api.service";
import {regions} from "../utils/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tabs: any;
  currentTab: string = 'password';

  user: any;
  region: any;
  profileAccount: any;
  profileSummoner: any = {};
  isAddedToProfile: boolean = false;
  isFavorite: boolean = false;
  password: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  notyf = new Notyf();

  constructor(private shared: SharedService,
              private firebase: FirebaseService,
              private api: ApiService,
              private router: Router) {}

  async ngOnInit() {
    this.shared.onLandingPageLoad(false);
    this.tabs = document.querySelectorAll('.tab');
    await this.userStatus();
    await this.getProfileAccout();
    if (this.profileAccount) {
      this.region = regions.find(region => region.shorthand === this.profileAccount.region);
      const summonerResponse = await this.api.getSummoner(this.region.code, this.profileAccount.name);
      this.profileSummoner.name = summonerResponse.name;
      this.profileSummoner.icon = summonerResponse.profileIconId;
      this.profileSummoner.level = summonerResponse.summonerLevel;
      this.profileSummoner.region = this.region.shorthand;
      const rankPointsResponse = await this.api.getRankPoints(this.region.code, summonerResponse.id);
      const rankSolo = rankPointsResponse.find((rank: any) => rank.queueType === 'RANKED_SOLO_5x5');
      const rankFlex = rankPointsResponse.find((rank: any) => rank.queueType === 'RANKED_FLEX_SR');
      if (rankSolo !== undefined) {
        this.profileSummoner.soloRank = {
          tier: rankSolo.tier,
          rank: rankSolo.rank,
          points: rankSolo.leaguePoints
        };
      }
      if (rankFlex !== undefined) {
        this.profileSummoner.flexRank = {
          tier: rankFlex.tier,
          rank: rankFlex.rank,
          points: rankFlex.leaguePoints
        };
      }
    }
  }

  changeTab(tab: any, value: string) {
    if (tab.classList.contains('tab-active')) return;
    else {
      for (let tabElement of this.tabs) {
        if (tabElement.classList.contains('tab-active')) {
          tabElement.classList.remove('tab-active');
        }
      }
      this.currentTab = tab.textContent.toLowerCase();
      tab.classList.add('tab-active');
    }
  }

  async userStatus() {
    const result = await this.firebase.userStatus();
    if (result) {
      this.user = result;
    } else {
      this.user = {};
    }
  }

  async changePassword() {
    if (this.newPassword !== this.repeatPassword) {
      this.notyf.error('Passwords do not match');
      return;
    }
    const response: any = await this.firebase.changePassword(this.password, this.newPassword);
    if (!response.error) {
      this.notyf.success('Password changed successfully');
      this.password = '';
      this.newPassword = '';
      this.repeatPassword = '';
    } else {
      this.notyf.error(response.error);
    }
  }

  openSummoner() {
    const url: string = `summoners/${this.profileSummoner.region}/${this.profileSummoner.name}`;
    this.router.navigateByUrl(url).then(r => console.log(r));
  }

  async getProfileAccout() {
    const result: any = await this.firebase.getProfileAccount(this.user.uid);
    if (result && !result.message) {
      this.profileAccount = result;
      this.isAddedToProfile = true;
    } else {
      this.profileAccount = null;
      this.isAddedToProfile = false;
    }
  }

  async removeFromProfile() {
    this.profileAccount = null;
    this.profileSummoner.profileAccount = null;
    await this.firebase.removeProfileAccount(this.user.uid);
    this.shared.onRemoveFromProfile(true);
  }

  async addToFavorites() {
    this.isFavorite = true;
    await this.firebase.addToFavorites(this.user.uid, this.region.code, this.profileSummoner.name);
  }

  async removeFavorite() {
    this.isFavorite = false;
    await this.firebase.removeFromFavorites(this.user.uid, this.profileSummoner.region, this.profileSummoner.name);
  }
}
