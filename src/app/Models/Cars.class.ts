import { Branch } from './Branch.class';

export class CarType {
  index: number;
  manufacturer: string;
  model: string;
  modelYear: string;
  dailyCost: number;
  dailyLateCost: number;
  transmission: string;

  constructor(
    i: number,
    manu: string,
    mod: string,
    modyear: string,
    dcost: number,
    latecost: number,
    transmission: string
  ) {
    this.index = i;
    this.manufacturer = manu;
    this.model = mod;
    this.modelYear = modyear;
    this.dailyCost = dcost;
    this.dailyLateCost = latecost;
    this.transmission = transmission;
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
