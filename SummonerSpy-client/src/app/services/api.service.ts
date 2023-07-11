import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getSummoner(selectedRegion: any, playerName:string): Promise<any> {
    return new Promise(resolve => {
      const a = this.http.get(`http://localhost:4320/summoners/${selectedRegion.majorRegion}/${selectedRegion.code}/${playerName}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getLeaderboard(server: string): Promise<any> {
    return new Promise(resolve => {
      const a: Subscription = this.http.get(`http://localhost:4320/${server}/leaderboards`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getFreeRotation(): Promise<any> {
    return new Promise(resolve => {
      const a: Subscription = this.http.get(`http://localhost:4320/free-rotation`).subscribe((data) => {
        resolve(data);
      });
    });
  }
}
