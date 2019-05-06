export class User {
  fullName: string;
  idNumber: string;
  userName: string;
  dateOfBirth?: Date;
  gender: Gender;
  eMail: string;
  image?: string;
  permissions: Permissions;
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
