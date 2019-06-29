import { Rental } from './Rental.class';

export class User {
  uid: number;
  FullName: string;
  IDNumber: string;
  UserName: string;
  DateOfBirth?: Date;
  Gender: Gender;
  EMail: string;
  Image?: string;
  Rentals?: Rental[];
  Permissions: Permissions;

  constructor();
  constructor(fullname?: string, idnum?: string, username?: string, gender?: Gender, email?: string) {
    this.FullName = fullname;
    this.IDNumber = idnum;
    this.UserName = username;
    this.Gender = gender;
    this.EMail = email;
  }
}

export enum Gender {
  'Male' = 0,
  'Female' = 1,
  'Peanut' = 2,
  'Other' = 3
}

export enum Permissions {
  'Guest' = 0,
  'Registered' = 1,
  'Employee' = 2,
  'Admin' = 3
}
