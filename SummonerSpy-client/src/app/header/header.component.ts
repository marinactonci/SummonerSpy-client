import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";
import {Notyf} from "notyf";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any;
  isLandingPage: boolean = false;

  constructor(private sharedService: SharedService,
              private router: Router,
              private firebase: FirebaseService,
              private toastr: ToastrService) {}

  async ngOnInit() {
    this.sharedService.currentLandingPage.subscribe(async isLandingPage => {
      this.isLandingPage = isLandingPage;

      const result = await this.firebase.userStatus();
      if (result) {
        this.isLoggedIn = true;
        this.user = result;
      }

      console.log('this.isLoggedIn', this.isLoggedIn);
      console.log('this.user', this.user);
    });
  }

  login() {
    this.router.navigateByUrl('/login').then(r => console.log(r));
  }

  async logout() {
    const response: any = await this.firebase.logout();

    if (response.error) {
      console.log('response');
      console.log(response);
      this.toastr.error(response.error.message);
    } else {
      this.isLoggedIn = false;
      this.user = null;
      this.toastr.success('Logout successful!');
      this.router.navigateByUrl('/').then(r => console.log(r));
    }
  }
}
