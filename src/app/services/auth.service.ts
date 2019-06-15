import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Models/Users.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:57182/api/auth';

  constructor(private http: HttpClient) {
   }

  isAuthenticated(): boolean {
    let isValid: boolean;

    try {
      const token = localStorage.getItem('token');
      if (token !== null) {
        console.log('Permitting user, token exists');
        isValid = true;
      }
    } catch (err) {
      console.log('No token was found, please log in.');
      isValid = false;
    }
    return isValid;
  }

  async getRole(): Promise<string> {
    const role = await this.http.get<string>(this.url).toPromise()
      .catch(err => {
        console.log(err);
        return err;
      });
    return role;
  }
}
