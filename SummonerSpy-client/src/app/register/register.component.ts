import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.onLandingPageLoad(false);
  }
}
