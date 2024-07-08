import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {champions} from "../utils/constants";
import {SharedService} from "../services/shared.service";
@Component({
  selector: 'app-free-rotation',
  templateUrl: './free-rotation.component.html',
  styleUrls: ['./free-rotation.component.css']
})
export class FreeRotationComponent implements OnInit {
  freeChampionIds: number[] = [];
  champions: any;
  isLoading: boolean = false;
  constructor(private api: ApiService,
              private shared: SharedService) {}

  async ngOnInit() {
    this.shared.onLandingPageLoad(false);

    this.isLoading = true;
    this.champions = champions;

    const data = await this.api.getFreeRotation();
    this.freeChampionIds = data.freeChampionIds;

    this.isLoading = false;
  }
}
