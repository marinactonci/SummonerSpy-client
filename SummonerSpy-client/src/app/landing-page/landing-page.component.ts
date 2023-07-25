import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.onLandingPageLoad(true);
  }
}
