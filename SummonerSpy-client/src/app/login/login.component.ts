import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";
import {Notyf} from "notyf";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  notyf: Notyf = new Notyf();

  constructor(private sharedService: SharedService,
              private firebase: FirebaseService,
              private router: Router) {}

  ngOnInit() {
    this.sharedService.onLandingPageLoad(false);
  }

  async login() {
    const response = await this.firebase.login(this.email, this.password);

    if (response.error) {
      console.log('response.error');
      console.log(response.error);
      console.log('Login failed. Please try again.');
      this.notyf.error(response.error.message);
    } else {
      console.log('Login successful!');
      this.notyf.success('Login successful!');
      this.router.navigateByUrl('/').then(r => console.log(r));
    }
  }
}
