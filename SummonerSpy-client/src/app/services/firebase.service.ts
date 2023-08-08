import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {endpoint} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  async getProfileAccount(uid: string) {
    return new Promise(resolve => {
      this.http.get(`${endpoint}/profile-account/${uid}`).subscribe((data) => {
        resolve(data);
      });
    })
  }

  async addProfileAccount(uid: string, region: string, name: string) {
    return new Promise(resolve => {
      const data = { uid, region, name };
      this.http.post<any>(`${endpoint}/add-profile-account/${uid}/${region}/${name}`, data)
        .subscribe((data) => {
        resolve(data);
      });
    })
  }

  async removeProfileAccount(uid: string) {
    return new Promise(resolve => {
      this.http.delete<any>(`${endpoint}/remove-profile-account/${uid}`)
        .subscribe((data) => {
          resolve(data);
        });
    })
  }

  async getFavorites(uid: string) {
    return new Promise(resolve => {
      this.http.get(`${endpoint}/get-favorites/${uid}`).subscribe((data) => {
        resolve(data);
      });
    })
  }

  async addToFavorites(userId: string, region: string, name: string) {
    return new Promise(resolve => {
      const data = { userId, region, name };
      this.http.post<any>(`${endpoint}/add-favorites/${userId}/${region}/${name}`, data)
        .subscribe((data) => {
        resolve(data);
      });
    })
  }

  async removeFromFavorites(userId: string, region: string, name: string) {
    return new Promise(resolve => {
      this.http.delete<any>(`${endpoint}/delete-favorites/${userId}/${region}/${name}`)
        .subscribe((data) => {
          resolve(data);
        });
    })
  }

  login(email: string, password: string): Promise<any> {
    return new Promise(resolve => {
      const data = { email, password };
      this.http.post<any>(`${endpoint}/login/${email}/${password}`, data)
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
      this.http.post<any>(`${endpoint}/register/${email}/${password}`, data)
        .subscribe(response => {
        resolve(response);
      }, error => {
        resolve(error);
      });
    });
  }

  async logout() {
    return new Promise(resolve => {
      this.http.get(`${endpoint}/logout`).subscribe((data) => {
        resolve(data);
      });
    });
  }

  async changePassword(password: string, newPassword: string) {
    return new Promise(resolve => {
      const data = { password, newPassword };
      this.http.post<any>(`${endpoint}/change-password/${password}/${newPassword}`, data)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async userStatus() {
    return new Promise(resolve => {
      this.http.get(`${endpoint}/user-status`).subscribe((data) => {
        resolve(data);
      });
    });
  }
}
