import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-esports',
  templateUrl: './esports.component.html',
  styleUrls: ['./esports.component.css']
})
export class EsportsComponent implements OnInit {
  constructor(private sharedService: SharedService,
              private api: ApiService) {}

  async ngOnInit() {
    this.sharedService.onLandingPageLoad(false);

    let response = await this.api.getSeries('2339');
    console.log(response);
  }
}
