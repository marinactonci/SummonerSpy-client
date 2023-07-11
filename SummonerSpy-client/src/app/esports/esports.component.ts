import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-esports',
  templateUrl: './esports.component.html',
  styleUrls: ['./esports.component.css']
})
export class EsportsComponent {
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.onLandingPageLoad(false);
  }
}
