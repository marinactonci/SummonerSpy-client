import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {regions} from "../../utils/constants";
import {Region} from "../../models/region.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  regionsList: Region[];
  selectedRegion: any;
  summonerName: string = '';
  constructor(private router: Router,
              private sharedService: SharedService) {}

  ngOnInit() {
    this.regionsList = regions;
  }

  onRegionSelect(selectedValue: string) {
    this.selectedRegion = this.regionsList.find(region => region.name === selectedValue);
  }
  search() {
    if (this.summonerName) {
      const url: string = `summoners/${this.selectedRegion.majorRegion}/${this.selectedRegion.shorthand}/${this.summonerName}`;
      this.router.navigateByUrl(url).then(r => console.log(r));
      this.sharedService.onRegionSelect(this.selectedRegion);
    }
  }
}
