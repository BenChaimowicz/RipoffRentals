import { RentalformService } from './rentalform.service';
import { CarsService } from './cars.service';
import { Injectable } from '@angular/core';
import { Car } from '../Models/Cars.class';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private carService: CarsService, private rentalService: RentalformService) { }

  async checkIfCarIsAvailable(car: Car, start: Date, end: Date): Promise<boolean> {
    const rental = await this.rentalService.getRentalByCarId(car.index);


    return true;
  }

}
