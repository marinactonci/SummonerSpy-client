import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {SharedService} from "../services/shared.service";
@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent {
  selectedRegion: any;
  summonerName: string;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.onLandingPageLoad(false);

    this.sharedService.currentRegion.subscribe((selectedRegion: any) => {
      console.log('selectedRegion');
      console.log(selectedRegion);
      this.selectedRegion = selectedRegion;
    });

    this.summonerName = this.route.snapshot.params['summonerName'];

    this.api.getSummoner(this.selectedRegion, this.summonerName).then((data) => {
      console.log(data);
    });
  }
}
