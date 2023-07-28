import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tabs: any;
  currentTab: string = '';

  password: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  notyf = new Notyf();
  constructor(private shared: SharedService,
              private firebase: FirebaseService) {}

  ngOnInit() {
    this.shared.onLandingPageLoad(false);
    this.tabs = document.querySelectorAll('.tab');
  }

  changeTab(tab: any, value: string) {
    if (tab.classList.contains('tab-active')) return;
    else {
      for (let tabElement of this.tabs) {
        if (tabElement.classList.contains('tab-active')) {
          tabElement.classList.remove('tab-active');
        }
      }
      this.currentTab = tab.textContent.toLowerCase();
      tab.classList.add('tab-active');
    }
  }

  async changePassword() {
    if (this.newPassword !== this.repeatPassword) {
      this.notyf.error('Passwords do not match');
      return;
    }
    const response: any = await this.firebase.changePassword(this.password, this.newPassword);
    if (!response.error) {
      this.notyf.success('Password changed successfully');
      this.password = '';
      this.newPassword = '';
      this.repeatPassword = '';
    } else {
      this.notyf.error(response.error);
    }
  }
}
