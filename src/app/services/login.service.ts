import { AlertService } from './alert.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';
import { User } from '../Models/Users.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLoggedIn: Subject<User> = new Subject<User>();

  url = 'http://localhost:57182/api/login';

  constructor(private http: HttpClient, private alertService: AlertService) {

   }

  private getToken(Email: string, Password: string): Promise<any> {
    if (Email === '' || Password === '' || Email == null || Password == null) {
      return null;
    }
    const body = { username: Email, password: Password };
    return this.http.post<string>(this.url, body).toPromise();
  }

  private saveToLocalStorage(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  }

  private getFromLocalStorage() {
    const authToken = {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token')
    };
    return authToken;
  }

  loginUser = async (username: string, password: string): Promise<boolean> => {
    try {
      const token = await this.getToken(username, password);
      if (token !== null) {
        this.saveToLocalStorage(token.FullName, token.Token);
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  setCurrentUser(user: User) {
    this.userLoggedIn.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.userLoggedIn.asObservable();
  }

  clearCurrentUser(): void {
    this.userLoggedIn.next();
  }

  isLoggedIn(): boolean {
    const token = this.getFromLocalStorage();
    if (token !== null || token !== undefined) {
      return true;
    }
    return false;
  }
}
