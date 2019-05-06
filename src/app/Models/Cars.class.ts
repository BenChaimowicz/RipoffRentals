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
}
