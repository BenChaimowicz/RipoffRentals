import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:57182/api/login';

  constructor(private http: HttpClient) { }

  private getToken(Email: string, Password: string): Promise<string> {
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
        this.saveToLocalStorage(username, token);
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

  loginWithToken = async () => {
  }
}
