import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  repeatPassword: string;
  notyf: Notyf = new Notyf();
  isLoading: boolean = false;

  constructor(private shared: SharedService,
              private firebase: FirebaseService,
              private router: Router) {}

  ngOnInit() {
    this.shared.onLandingPageLoad(false);
  }

 async register() {
    this.isLoading = true;
    if (this.password !== this.repeatPassword) {
      this.notyf.error('Passwords do not match');
      this.isLoading = false;
      return;
    }

    const response = await this.firebase.register(this.email, this.password);
    if (response.error) {
      this.notyf.error(response.error.message);
    } else {
      this.notyf.success('Registration successful!');
      this.router.navigateByUrl('/').then(r => console.log(r));
    }

    this.isLoading = false;
  }
}
