import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car, CarType } from '../Models/Cars.class';
import { Branch } from '../Models/Branch.class';
import { BranchService } from './branch.service';
import { ImageHelper } from '../helpers/imageHelper';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private cars: Car[] = [];
  carUrl = 'http://localhost:57182/api/cars';
  typeUrl = 'http://localhost:57182/api/cartypes';

  currCar: BehaviorSubject<Car> = new BehaviorSubject<Car>(null);

  constructor(private http: HttpClient, private branchService: BranchService) {

   }

  setCurrentCar(car: Car) {
    this.currCar.next(car);
  }

  getCurrentCar(): Observable<Car> {
    return this.currCar.asObservable();
  }

  async getCarById(id: number): Promise<Car> {
    const raw: RawCar = await this.http.get<RawCar>(this.carUrl + '/' + id).toPromise();
    return await this.convertToCar(raw);
  }

  async getCars(): Promise<Car[]> {
    let rawCars: RawCar[] = [];

    try {
      rawCars = await this.getRawCars().toPromise();
      for (let rc of rawCars) {
        const car: Car = await this.convertToCar(rc);
        this.cars.push(car);
      }
      return this.cars;
    } catch (err) {
      console.error(err);
      console.error('It seems the connection to the database is down, please try again later or contact someone.');
    }
  }

  getRawCars(): Observable<RawCar[]> {
    return this.http.get<RawCar[]>(this.carUrl);
  }

  getCarTypeByIndex(id: number): Observable<CarType> {
    return this.http.get<CarType>(this.typeUrl + '/' + id);
  }

  async convertToCar(raw: RawCar): Promise<Car> {
    const branch = await this.branchService.getBranchById(raw.Branch).toPromise();
    const carType = await this.getCarTypeByIndex(raw.CarTypeIndex).toPromise();
    const image = await ImageHelper.getSrcFromBase64(raw.Image);
    const car: Car = new Car(raw.Index, carType, raw.Mileage, image, raw.FitForRental, raw.Available, raw.PlateNumber, branch);
    return car;
  }
}

interface RawCar {
  Index: number;
  CarTypeIndex: number;
  Mileage: number;
  Image: string;
  FitForRental: boolean;
  Available: boolean;
  PlateNumber: string;
  Branch: number;
}
