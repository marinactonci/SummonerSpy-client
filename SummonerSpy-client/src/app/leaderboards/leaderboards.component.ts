import {Component} from '@angular/core';
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
export class LeaderboardsComponent {
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

  searchValue: string = '';
  hasSearched: boolean = false;
  hasNoResults: boolean = false;

  constructor(private sharedService: SharedService,
              private api: ApiService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.itemsPerPage = this.itemsPerPageList[2];
    this.sharedService.onLandingPageLoad(false);

    for (let region of regions) {
      if (region.leaderboardRegion) this.regionsList.push(region);
    }
    this.selectedRegion = this.regionsList[0];

    await this.getLeaderboardData(this.selectedRegion);
  }

  async getLeaderboardData(selectedRegion: any): Promise<void> {
    this.isLoading = true;
    this.tempArr = [];
    let rank: number = 1;

    await this.api.getLeaderboard(selectedRegion.code).then((data) => {
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
    });

    this.tempArr.sort((a, b) => b.points - a.points);

    for (let item of this.tempArr) {
      item.rank = rank;
      rank++;
    }

    this.maxPage = Math.ceil(this.tempArr.length / this.itemsPerPage);

    this.updateLeaderboard();

    this.isLoading = false;
  }

  async onRegionSelect(selectedValue: string): Promise<void> {
    this.selectedRegion = this.regionsList.find(region => region.name === selectedValue);
    await this.getLeaderboardData(this.selectedRegion);
    this.maxPage = Math.ceil(this.tempArr.length / this.itemsPerPage);
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
    this.leaderboardInfo = this.tempArr.filter(item => item.summonerName.toLowerCase().includes(searchValue.toLowerCase()));
    if (!this.leaderboardInfo.length) {
      this.hasNoResults = true;
    }
  }

  clear() {
    this.hasSearched = false;
    this.searchValue = '';
    this.hasNoResults = false;
    this.updateLeaderboard();
  }
}

