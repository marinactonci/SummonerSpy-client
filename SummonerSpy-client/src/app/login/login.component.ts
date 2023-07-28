import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";
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
  isLoading: boolean = false;

  constructor(private shared: SharedService,
              private firebase: FirebaseService,
              private router: Router) {}

  ngOnInit() {
    this.shared.onLandingPageLoad(false);
  }

  async login() {
    this.isLoading = true;
    const response = await this.firebase.login(this.email, this.password);

    if (response.error) {
      this.notyf.error(response.error.message);
    } else {
      this.notyf.success('Login successful!');
      this.router.navigateByUrl('/').then(r => console.log(r));
    }

    this.isLoading = false;
  }
}
