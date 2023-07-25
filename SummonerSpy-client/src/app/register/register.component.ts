import { Component, OnInit } from '@angular/core';
import {SharedService} from "../services/shared.service";
import {FirebaseService} from "../services/firebase.service";
import {Notyf} from "notyf";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;

  constructor(private shared: SharedService,
              private firebase: FirebaseService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.shared.onLandingPageLoad(false);
  }

 async register() {
    if (this.password !== this.repeatPassword) return;

    const response = await this.firebase.register(this.email, this.password);
    if (response.error) {
      console.log('response.error');
      console.log(response.error);
      console.log('Registration failed. Please try again.');
      this.toastr.error(response.error.message);
    } else {
      console.log('Registration successful!');
      this.toastr.success('Registration successful!');
      this.router.navigateByUrl('/').then(r => console.log(r));
    }
  }
}
