import { AlertService } from './alert.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../Models/Users.class';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLoggedIn: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  currStorage: any;

  url = 'http://localhost:57182/api/login';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private userService: UsersService) {
    this.currStorage = this.getFromLocalStorage();
    if (this.currStorage !== null || this.currStorage !== undefined) {
      this.setCurrentUser(parseInt(this.currStorage.userid, 10));
    }
  }

  private getToken(Email: string, Password: string): Promise<any> {
    if (Email === '' || Password === '' || Email == null || Password == null) {
      return null;
    }
    const body = { username: Email, password: Password };
    return this.http.post<string>(this.url, body).toPromise();
  }

  private saveToLocalStorage(username: string, userid: number, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('userid', userid.toString());
    localStorage.setItem('token', token);
  }

  private getFromLocalStorage() {
    const authToken = {
      username: localStorage.getItem('username'),
      userid: localStorage.getItem('userid'),
      token: localStorage.getItem('token')
    };
    return authToken;
  }

  loginUser = async (username: string, password: string): Promise<boolean> => {
    try {
      const token = await this.getToken(username, password);
      if (token !== null) {
        this.saveToLocalStorage(token.FullName, token.Id , token.Token);
        await this.setCurrentUser(token.Id);
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
    localStorage.removeItem('userid');
    this.clearCurrentUser();
  }

  async setCurrentUser(id: number) {
    const user = await this.userService.getUser(id);
    this.userLoggedIn.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.userLoggedIn.asObservable();
  }

  clearCurrentUser(): void {
    this.userLoggedIn.next(null);
  }

  isLoggedIn(): boolean {
    try {
      const token = this.getFromLocalStorage();
      if (token !== null || token !== undefined) {
        return true;
      }
      return false;
    } catch (err) {
      console.warn(err);
    }
  }

}
