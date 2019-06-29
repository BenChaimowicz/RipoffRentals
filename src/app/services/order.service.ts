import { RentalformService } from './rentalform.service';
import { CarsService } from './cars.service';
import { Injectable } from '@angular/core';
import { Car } from '../Models/Cars.class';
import { Moment } from 'moment';
import * as moment from 'moment';
import { User } from '../Models/Users.class';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private carService: CarsService, private rentalService: RentalformService, private loginService: LoginService) { }

  async checkIfCarIsAvailable(car: Car, start: Date, end: Date): Promise<boolean> {
    const now: Moment = moment(Date(), 'DD/MM/YYYY', true);
    const rental = await this.rentalService.getRentalByCarId(car.index);
    const rStart: Moment = moment(new Date(rental.startDate), 'DD/MM/YYYY', true);
    const rEnd: Moment = moment(new Date(rental.endDate), 'DD/MM/YYYY', true);
    const mStart: Moment = moment(start, 'DD/MM/YYYY', true);
    const mEnd: Moment = moment(end, 'DD/MM/YYYY', true);

    if (car.fitForRental) {
      if (mStart.isAfter(rEnd) || (mStart.isBefore(rStart) && mEnd.isBefore(rStart))) {
        return true;
      }
    } else if (!car.fitForRental && car.available && mStart.isAfter(now.add(7, 'd'))) {
      if (mStart.isAfter(rEnd) || (mStart.isBefore(rStart) && mEnd.isBefore(rStart))) {
        return true;
      }
    } else if (car.fitForRental && car.available) {
      return true;
    }
    return false;
  }

  async orderCar(car: Car, sDate: Date, eDate: Date) {
    const uId = this.loginService.getCurrentUserId();
    const startDate: Moment = moment(sDate, 'DD/MM/YYYY', true);
    const endDate: Moment = moment(eDate, 'DD/MM/YYYY', true);

    this.rentalService.createNewRental(startDate, endDate, car.index, uId)
      .subscribe(res => console.log(res), error => console.error(error));
  }
}
