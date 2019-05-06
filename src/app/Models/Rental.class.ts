import { Car } from './Cars.class';
import { User } from './Users.class';

export class Rental {
  startDate: Date;
  endDate: Date;
  returnDate: Date;
  user: User;
  car: Car;
}
