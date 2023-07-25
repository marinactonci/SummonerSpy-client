import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<any> {
    return new Promise(resolve => {
      const data = { email, password };
      this.http.post<any>(`http://localhost:4320/login/${email}/${password}`, data)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.error(error);
          resolve(error);
        });
    });
  }

  register(email: string, password: string): Promise<any> {
    return new Promise(resolve => {
      const data = { email, password };
      this.http.post<any>(`http://localhost:4320/register/${email}/${password}`, data)
        .subscribe(response => {
        resolve(response);
      }, error => {
        console.log(error);
        resolve(error);
      });
    });
  }

  async logout() {
    return new Promise(resolve => {
      this.http.get(`http://localhost:4320/logout`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  async userStatus() {
    return new Promise(resolve => {
      this.http.get(`http://localhost:4320/user-status`).subscribe((data) => {
        resolve(data);
      });
    });
  }
}
