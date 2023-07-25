import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  isPopupVisible: boolean = false;

  constructor(public api: ApiService,
              public router: Router) {}

  ngOnInit() {
    this.api.subscription.subscribe((data: any) => {
      if (!data) {
        return;
      }

      this.data = data;
      this.isPopupVisible = true;
    });
  }

  openMultiSearch() {
    this.isPopupVisible = false;
    this.router.navigateByUrl('/multisearch').then(r => console.log(r));
  }
}
