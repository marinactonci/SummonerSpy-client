import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.shared.onLandingPageLoad(false);
  }
}
