import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getSummoner(selectedRegion: string, summonerName:string): Promise<any> {
    return new Promise(resolve => {
      const a = this.http.get(`https://summoner-spy.site/summoner/${selectedRegion}/${summonerName}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getRankPoints(selectedRegion: string, id: string): Promise<any> {
    return new Promise(resolve => {
      const a = this.http.get(`https://summoner-spy.site/rankPoints/${selectedRegion}/${id}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getMasteryPoints(selectedRegion: string, id: string) {
    return new Promise(resolve => {
      const a = this.http.get(`https://summoner-spy.site/masteryPoints/${selectedRegion}/${id}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getAllMatches(selectedRegion: string, puuid: string, start: string, count: string) {
    return new Promise(resolve => {
      const a = this.http.get(`https://summoner-spy.site/allMatches/${selectedRegion}/${puuid}/${start}/${count}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getMatch(selectedRegion: string, matchId: string) {
    return new Promise(resolve => {
      const a = this.http.get(`https://summoner-spy.site/match/${selectedRegion}/${matchId}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getLeaderboard(server: string, queueType: string): Promise<any> {
    return new Promise(resolve => {
      const a: Subscription = this.http.get(`https://summoner-spy.site/leaderboards/${server}/${queueType}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getFreeRotation(): Promise<any> {
    return new Promise(resolve => {
      const a: Subscription = this.http.get(`https://summoner-spy.site/free-rotation`).subscribe((data) => {
        resolve(data);
      });
    });
  }
}
