import { Branch } from './Branch.class';

export class CarType {
  manufacturer: string;
  model: string;
  modelYear: string;
  dailyCost: number;
  dailyLateCost: number;
  transmission: Transmission;
}

export enum Transmission {
  'Manual' = 0,
  'Automatic' = 1,
  'Robotic' = 2
}

export class Car {
  type: CarType;
  mileage: number;
  image: string;
  fitForRental: boolean;
  available: boolean;
  plateNumber: string;
  branch: Branch[];

  constructor(type: CarType, image: string, plateNum: string) {
    this.type = type;
    this.mileage = 0;
    this.image = image;
    this.fitForRental = true;
    this.available = true;
    this.plateNumber = plateNum;
  }
}
