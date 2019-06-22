import { Branch } from './Branch.class';

export class CarType {
  Index: number;
  Manufacturer: string;
  Model: string;
  ModelYear: string;
  DailyCost: number;
  DailyLateCost: number;
  Transmission: string;

  constructor(
    i: number,
    manu: string,
    mod: string,
    modyear: string,
    dcost: number,
    latecost: number,
    transmission: string
  ) {
    this.Index = i;
    this.Manufacturer = manu;
    this.Model = mod;
    this.ModelYear = modyear;
    this.DailyCost = dcost;
    this.DailyLateCost = latecost;
    this.Transmission = transmission;
  }
}

export class Car {
  index: number;
  type: CarType;
  mileage: number;
  image: string;
  fitForRental: boolean;
  available: boolean;
  plateNumber: string;
  branch: Branch;

  constructor(
    id: number,
    type: CarType,
    miles: number,
    image: string,
    fit: boolean,
    available: boolean,
    plateNum: string,
    branch: Branch
  ) {
    this.index = id;
    this.type = type;
    this.mileage = miles;
    this.image = image;
    this.fitForRental = fit;
    this.available = available;
    this.plateNumber = plateNum;
    this.branch = branch;
  }
}
