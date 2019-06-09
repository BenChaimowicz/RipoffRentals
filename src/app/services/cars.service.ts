import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../Models/Cars.class';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  url = 'http://localhost:57182/api/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url);
  }
}
