import { LoginService } from 'src/app/services/login.service';
import { Moment } from 'moment';
import { UsersService } from './users.service';
import { CarsService } from './cars.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../Models/Rental.class';
import { User, Permissions } from '../Models/Users.class';

@Injectable({
  providedIn: 'root'
})
export class RentalformService {

  url = 'http://localhost:57182/api/rentals';

  constructor(
    private http: HttpClient,
    private carService: CarsService,
    private userService: UsersService,
    private loginService: LoginService) { }

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
    const allraw: RawRental[] = await this.getRawRentals();
    const needed: RawRental = allraw.reverse().find(raw => raw.CarIndex === carId);
    const rental: Rental = await this.convertToRental(needed);
    return rental;
  }


  private async convertToRental(raw: RawRental): Promise<Rental> {
    const user: User = await this.loginService.getCurrentUser();
    const userId: number = user.uid;
    const rental: Rental = new Rental();
    rental.car = await this.carService.getCarById(raw.CarIndex);
    if (userId === raw.UserIndex || user.Permissions === Permissions.Admin) {
      rental.user = await this.userService.getUser(raw.UserIndex);
    } else {
      rental.user = new User();
      rental.user.uid = raw.UserIndex;
    }
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
