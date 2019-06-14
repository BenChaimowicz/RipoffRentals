import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../Models/Branch.class';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  url = 'http://localhost:57182/api/branches';

  constructor(private http: HttpClient) { }

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(this.url + '/' + id);
  }
}
