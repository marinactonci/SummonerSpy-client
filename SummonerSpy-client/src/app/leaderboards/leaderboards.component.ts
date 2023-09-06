import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../services/shared.service";
import {ApiService} from "../services/api.service";
import {regions} from "../utils/constants";
import {Region} from "../models/region.model";
import {Leaderboard} from "../models/leaderboard.model";

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
  queueTypes: { name: string, code: string }[] = [
    { name: 'Ranked Solo/Duo', code: 'RANKED_SOLO_5x5' },
    { name: 'Ranked Flex', code: 'RANKED_FLEX_SR' }];
  selectedQueueType: any;
  regionsList: Region[] = [];
  selectedRegion: any;
  leaderboardInfo: Leaderboard[] = [];
  tempArr: Leaderboard[] = [];
  isLoading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number;
  itemsPerPageList: number[] = [5, 15, 20, 25, 50, 100];
  startIndex: number;
  endIndex: number;
  maxPage: number;
  numberOfResults: number = 0;

  searchValue: string = '';
  hasSearched: boolean = false;
  hasNoResults: boolean = false;

  constructor(private shared: SharedService,
              private api: ApiService,
              private router: Router) {}

  async ngOnInit() {
    this.isLoading = true;
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.itemsPerPage = this.itemsPerPageList[2];
    this.shared.onLandingPageLoad(false);

    for (let region of regions) {
      if (region.leaderboardRegion) this.regionsList.push(region);
    }
    this.selectedRegion = this.regionsList[0];
    this.selectedQueueType = this.queueTypes[0];

    await this.getLeaderboardData();
  }

  async getLeaderboardData(): Promise<void> {
    this.isLoading = true;
    this.hasNoResults = false;
    this.tempArr = [];
    let rank: number = 1;

    const data = await this.api.getLeaderboard(this.selectedRegion.code, this.selectedQueueType.code);
    if (Object.keys(data).length === 0) {
      this.isLoading = false;
      this.hasNoResults = true;
      return;
    }
    for (let item of data) {
      this.tempArr.push({
        summonerName: item.summonerName,
        points: item.leaguePoints,
        stats: {
          wins: item.wins,
          losses: item.losses,
          winrate: Math.round(item.wins / (item.wins + item.losses) * 100)
        }
      });
    }
    this.tempArr.sort((a, b) => b.points - a.points);
    for (let item of this.tempArr) {
      item.rank = rank;
      rank++;
    }
    this.maxPage = Math.ceil(this.tempArr.length / this.itemsPerPage);
    this.numberOfResults = this.tempArr.length;
    this.updateLeaderboard();

    this.isLoading = false;
  }

  async onQueueTypeSelect(selectedValue: string): Promise<void> {
    this.selectedQueueType = this.queueTypes.find(queue => queue.name === selectedValue);
    await this.getLeaderboardData();
  }

  async onRegionSelect(selectedValue: string): Promise<void> {
    this.selectedRegion = this.regionsList.find(region => region.name === selectedValue);
    await this.getLeaderboardData();
  }

  async nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.updateLeaderboard();
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateLeaderboard();
    }
  }

  updateLeaderboard() {
    this.isLoading = true;
    this.leaderboardInfo = [];
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;

    for (let i = this.startIndex; i < this.endIndex; i++) {
      if (this.tempArr[i]) {
        this.leaderboardInfo.push(this.tempArr[i]);
      }
    }

    this.isLoading = false;
  }

  updateItemsPerPage(value: number) {
    this.itemsPerPage = parseInt(value.toString());
    this.currentPage = 1;
    this.maxPage = Math.ceil(this.tempArr.length / this.itemsPerPage);
    this.updateLeaderboard();
  }

  async search(searchValue: string): Promise<void> {
    this.searchValue = searchValue;
    if (this.searchValue.length && this.searchValue !== '') {
      this.hasSearched = true;
    }
    this.tempArr = this.tempArr.filter(item => item.summonerName.toLowerCase().includes(searchValue.toLowerCase()));
    if (!this.tempArr.length) {
      this.hasNoResults = true;
    }
    this.numberOfResults = this.tempArr.length;
    this.currentPage = 1;
    this.maxPage = Math.ceil(this.tempArr.length / this.itemsPerPage);
    this.updateLeaderboard();
  }

  async clear() {
    this.hasSearched = false;
    this.searchValue = '';
    this.hasNoResults = false;
    this.currentPage = 1;
    await this.getLeaderboardData();
  }

  openSummoner(item) {
    if (item.summonerName) {
      const url: string = `summoners/${this.selectedRegion.shorthand}/${item.summonerName}`;
      this.router.navigateByUrl(url).then(r => console.log(r));
    }
  }
}

