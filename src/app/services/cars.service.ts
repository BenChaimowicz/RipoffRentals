import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car, CarType } from '../Models/Cars.class';
import { Branch } from '../Models/Branch.class';
import { BranchService } from './branch.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  carUrl = 'http://localhost:57182/api/cars';
  typeUrl = 'http://localhost:57182/api/cartypes';

  constructor(private http: HttpClient, private branchService: BranchService) { }

  private cars: Car[] = [];

  async getCars() {
    let branch: Branch;
    let cartype: CarType;
    let rawCars: RawCar[] = [];

    rawCars = await this.getRawCars().toPromise();
    console.log(rawCars);
    for (let rc of rawCars) {
      console.log(rc);
      branch = await this.branchService.getBranchById(rc.Branch).toPromise();
      cartype = await this.getCarTypeByIndex(rc.CarTypeIndex).toPromise();
      console.log('branch: ' + branch, 'type: ' + cartype);
      this.cars.push(new Car(rc.Index, cartype, rc.Mileage, rc.Image, rc.Fit, rc.Available, rc.Platenumber, branch));
    }
    return this.cars;
  }

  getRawCars(): Observable<RawCar[]> {
    return this.http.get<RawCar[]>(this.carUrl);
  }

  getCarTypeByIndex(id: number): Observable<CarType> {
    return this.http.get<CarType>(this.typeUrl + '/' + id);
  }

}

interface RawCar {
  Index: number;
  CarTypeIndex: number;
  Mileage: number;
  Image: string;
  Fit: boolean;
  Available: boolean;
  Platenumber: string;
  Branch: number;
}
