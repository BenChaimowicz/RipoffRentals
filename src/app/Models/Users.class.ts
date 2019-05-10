import { Rental } from './Rental.class';

export class User {
  uid: number;
  fullName: string;
  idNumber: string;
  userName: string;
  dateOfBirth?: Date;
  gender: Gender;
  eMail: string;
  image?: string;
  rentals?: Rental[];
  permissions: Permissions;

  constructor(fullname: string, idnum: string, username: string, gender: Gender, email: string) {
    this.fullName = fullname;
    this.idNumber = idnum;
    this.userName = username;
    this.gender = gender;
    this.eMail = email;
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
