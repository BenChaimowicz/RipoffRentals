import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../Models/Cars.class';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  url = window.location.origin + '/api/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url);
  }
}
