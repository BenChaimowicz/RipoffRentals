import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/Users.class';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:57182/api/users';

  constructor(private http: HttpClient) { }

  getUser(id: number): Promise<any> {
    return this.http.get<User>(this.url + '/' + id).toPromise()
      .catch(err => console.error(err)).then();
  }
}
