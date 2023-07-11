import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.onLandingPageLoad(false);
  }
}
