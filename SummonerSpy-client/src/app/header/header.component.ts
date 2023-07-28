import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any;
  isLandingPage: boolean = false;
  notyf: Notyf = new Notyf();

  hasProfileAccount: boolean = false;
  profileAccount: any;

  constructor(private shared: SharedService,
              private router: Router,
              private firebase: FirebaseService) {}

  async ngOnInit() {
    this.shared.currentLandingPage.subscribe(async isLandingPage => {
      this.isLandingPage = isLandingPage;

      const result = await this.firebase.userStatus();
      if (result) {
        this.isLoggedIn = true;
        this.user = result;
        if (!this.user.displayName) this.user.displayName = this.user.email.split('@')[0];
        const result2: any = await this.firebase.getProfileAccount(this.user.uid);
        if (result2 && !result2.message) {
          this.hasProfileAccount = true;
          this.profileAccount = result2;
        } else {
          this.hasProfileAccount = false;
          this.profileAccount = null;
        }
        this.shared.currentProfileAccount.subscribe(async isRemovedFromProfile => {
          if (isRemovedFromProfile) {
            this.hasProfileAccount = false;
            this.profileAccount = null;
          } else {
            const result3: any = await this.firebase.getProfileAccount(this.user.uid);
            if (result3 && !result3.message) {
              this.hasProfileAccount = true;
              this.profileAccount = result3;
            }
          }
        });
      }
    });
  }

  login() {
    this.router.navigateByUrl('/login').then(r => console.log(r));
  }

  async logout() {
    const response: any = await this.firebase.logout();

    if (response.error) {
      this.notyf.error(response.error.message);
    } else {
      this.isLoggedIn = false;
      this.user = null;
      this.notyf.success('Logout successful!');
    }
  }
}
