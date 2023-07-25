import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://127.0.0.1/lol-champ-select/v1/session';
  private dataSubject= new BehaviorSubject<any>(null);
  subscription= this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    //this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      this.fetchData();
    }, 5000);
  }

  private fetchData(): void {
    this.http.get(this.apiUrl).subscribe((data) => {
      if (data) this.dataSubject.next(data);
    });
  }

  getSummoner(selectedRegion: string, summonerName:string): Promise<any> {
    return new Promise(resolve => {
      const a = this.http.get(`http://localhost:4320/summoner/${selectedRegion}/${summonerName}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getRankPoints(selectedRegion: string, id: string): Promise<any> {
    return new Promise(resolve => {
      const a = this.http.get(`http://localhost:4320/rankPoints/${selectedRegion}/${id}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getMasteryPoints(selectedRegion: string, id: string) {
    return new Promise(resolve => {
      const a = this.http.get(`http://localhost:4320/masteryPoints/${selectedRegion}/${id}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getAllMatches(selectedRegion: string, puuid: string, start: string, count: string) {
    return new Promise(resolve => {
      const a = this.http.get(`http://localhost:4320/allMatches/${selectedRegion}/${puuid}/${start}/${count}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getMatch(selectedRegion: string, matchId: string) {
    return new Promise(resolve => {
      const a = this.http.get(`http://localhost:4320/match/${selectedRegion}/${matchId}`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getLeaderboard(server: string, queueType: string): Promise<any> {
    return new Promise(resolve => {
      const a: Subscription = this.http.get(`http://localhost:4320/leaderboards/${server}/${queueType}`).subscribe((data) => {
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

  getSeries(seriesId: string): Promise<any> {
    return new Promise(resolve => {
      const a: Subscription = this.http.get(`http://localhost:4320/series/${seriesId}`).subscribe((data) => {
        resolve(data);
      });
    });
  }
}
