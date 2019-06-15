import { Observable } from 'rxjs';
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

  carUrl = 'http://localhost:57182/api/cars';
  typeUrl = 'http://localhost:57182/api/cartypes';

  constructor(private http: HttpClient, private branchService: BranchService) { }

  private cars: Car[] = [];

  async getCars() {
    let branch: Branch;
    let cartype: CarType;
    let rawCars: RawCar[] = [];
    let image: string;

    try {
      rawCars = await this.getRawCars().toPromise();
      for (let rc of rawCars) {
        branch = await this.branchService.getBranchById(rc.Branch).toPromise();
        cartype = await this.getCarTypeByIndex(rc.CarTypeIndex).toPromise();
        image = await ImageHelper.getSrcFromBase64(rc.Image);
        this.cars.push(new Car(rc.Index, cartype, rc.Mileage, image, rc.Fit, rc.Available, rc.Platenumber, branch));
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
