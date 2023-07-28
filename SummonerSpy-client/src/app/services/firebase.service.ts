import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  async getProfileAccount(uid: string) {
    return new Promise(resolve => {
      this.http.get(`http://localhost:4320/profile-account/${uid}`).subscribe((data) => {
        resolve(data);
      });
    })
  }

  async addProfileAccount(uid: string, region: string, name: string) {
    return new Promise(resolve => {
      const data = { uid, region, name };
      this.http.post<any>(`http://localhost:4320/add-profile-account/${uid}/${region}/${name}`, data)
        .subscribe((data) => {
        resolve(data);
      });
    })
  }

  async removeProfileAccount(uid: string) {
    return new Promise(resolve => {
      this.http.delete<any>(`http://localhost:4320/remove-profile-account/${uid}`)
        .subscribe((data) => {
          resolve(data);
        });
    })
  }

  async getFavorites(uid: string) {
    return new Promise(resolve => {
      this.http.get(`http://localhost:4320/get-favorites/${uid}`).subscribe((data) => {
        resolve(data);
      });
    })
  }

  async addToFavorites(userId: string, region: string, name: string) {
    return new Promise(resolve => {
      const data = { userId, region, name };
      this.http.post<any>(`http://localhost:4320/add-favorites/${userId}/${region}/${name}`, data)
        .subscribe((data) => {
        resolve(data);
      });
    })
  }

  async removeFromFavorites(userId: string, region: string, name: string) {
    return new Promise(resolve => {
      this.http.delete<any>(`http://localhost:4320/delete-favorites/${userId}/${region}/${name}`)
        .subscribe((data) => {
          resolve(data);
        });
    })
  }

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

  async changePassword(password: string, newPassword: string) {
    return new Promise(resolve => {
      const data = { password, newPassword };
      this.http.post<any>(`http://localhost:4320/change-password/${password}/${newPassword}`, data)
        .subscribe((data) => {
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
