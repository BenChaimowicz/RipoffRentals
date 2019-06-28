import { Moment } from 'moment';
import { UsersService } from './users.service';
import { CarsService } from './cars.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../Models/Rental.class';

@Injectable({
  providedIn: 'root'
})
export class RentalformService {

  url = 'http://localhost:57182/api/rentals';

  constructor(private http: HttpClient, private carService: CarsService, private userService: UsersService) { }

  private getRawRentals(): Promise<RawRental[]> {
    return this.http.get<RawRental[]>(this.url).toPromise();
  }

  async getRentalById(id: number): Promise<Rental> {
    if (id !== null && id !== undefined) {
      const raw = await this.http.get<RawRental>(this.url + '/' + id).toPromise();
      const rental: Rental = await this.convertToRental(raw);
      return rental;
    }
  }

  async getRentalByCarId(carId: number): Promise<Rental> {
    const allRaw: RawRental[] = await this.getRawRentals();
    const rawRental: RawRental = allRaw.reverse().find(rent => rent.CarIndex === carId);
    return await this.convertToRental(rawRental);
  }


  private async convertToRental(raw: RawRental): Promise<Rental> {
    const rental: Rental = new Rental();
    rental.car = await this.carService.getCarById(raw.CarIndex);
    rental.user = await this.userService.getUser(raw.UserIndex);
    rental.startDate = raw.StartDate;
    rental.endDate = raw.EndDate;
    rental.returnDate = raw.ReturnDate;

    return rental;
  }

  createNewRental(sDate: Moment, eDate: Moment, carId: number, userId: number) {
    const rental: RawRental = {
      StartDate: sDate.toDate(),
      EndDate: eDate.toDate(),
      ReturnDate: null,
      UserIndex: userId,
      CarIndex: carId
    };
    return this.http.post(this.url, rental);
  }
}

interface RawRental {
  Index?: number;
  StartDate: Date;
  EndDate: Date;
  ReturnDate: Date;
  UserIndex: number;
  CarIndex: number;
}
