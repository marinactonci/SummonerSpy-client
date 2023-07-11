import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  user: any;
  isDarkTheme: boolean = false;
  isLandingPage: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentLandingPage.subscribe((isLandingPage: boolean) => {
      this.isLandingPage = isLandingPage;
    });
  }
}
