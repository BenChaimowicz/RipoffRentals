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

  getRawRentals(): Promise<RawRental[]> {
    return this.http.get<RawRental[]>(this.url).toPromise();
  }

  async getRentalById(id: number): Promise<Rental> {
    if (id !== null && id !== undefined) {
      const raw = await this.http.get<RawRental>(this.url + '/' + id).toPromise();
      const rental: Rental = await this.convertToRental(raw);
      return rental;
    }
  }

  async convertToRental(raw: RawRental): Promise<Rental> {
    const rental: Rental = new Rental();
    rental.car = await this.carService.getCarById(raw.CarIndex);
    rental.user = await this.userService.getUser(raw.UserIndex);
    rental.startDate = raw.StartDate;
    rental.endDate = raw.EndDate;
    rental.returnDate = raw.ReturnDate;

    return rental;
  }
}

interface RawRental {
  Index: number;
  StartDate: Date;
  EndDate: Date;
  ReturnDate: Date;
  UserIndex: number;
  CarIndex: number;
}
