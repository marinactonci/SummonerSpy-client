import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SharedService {
  private isLandingPage: any = new BehaviorSubject(true);
  currentLandingPage = this.isLandingPage.asObservable();

  private isRemovedFromProfile: any = new BehaviorSubject(false);
  currentProfileAccount = this.isRemovedFromProfile.asObservable();

  constructor() {}

  onLandingPageLoad(isLandingPage: boolean) {
    this.isLandingPage.next(isLandingPage);
  }

  onRemoveFromProfile(isRemovedFromProfile: boolean) {
    this.isRemovedFromProfile.next(isRemovedFromProfile);
  }
}
