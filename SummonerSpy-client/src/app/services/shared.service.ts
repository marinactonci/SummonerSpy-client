import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SharedService {
  private regionSelected: any = new BehaviorSubject(true);
  currentRegion = this.regionSelected.asObservable();
  private isLandingPage: any = new BehaviorSubject(true);
  currentLandingPage = this.isLandingPage.asObservable();

  constructor() { }

  onRegionSelect(selectedRegion: any) {
    this.regionSelected.next(selectedRegion);
  }

  onLandingPageLoad(isLandingPage: boolean) {
    this.isLandingPage.next(isLandingPage);
  }
}
