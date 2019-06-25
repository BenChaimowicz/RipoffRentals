import { Injectable } from '@angular/core';
import { Car } from '../Models/Cars.class';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  checkIfCarIsAvailable(car: Car, start: Date, end: Date) {

  }

  checkDatesForRent(start: Date, end: Date) {

  }
}
