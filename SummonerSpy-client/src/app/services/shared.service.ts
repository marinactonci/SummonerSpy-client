import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Region} from "../models/region.model";

@Injectable({providedIn: 'root'})
export class SharedService {
  private isLandingPage: any = new BehaviorSubject(true);
  currentLandingPage = this.isLandingPage.asObservable();

  constructor() {}

  onLandingPageLoad(isLandingPage: boolean) {
    this.isLandingPage.next(isLandingPage);
  }
}
