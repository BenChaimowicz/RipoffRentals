import { AlertService, Alert } from './../../services/alert.service';
import { OrderService } from './../../services/order.service';
import { RentalformService } from './../../services/rentalform.service';
import { Rental } from './../../Models/Rental.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/services/routing.service';
import { CarsService } from './../../services/cars.service';
import { Car } from './../../Models/Cars.class';
import { Component, OnInit, Input } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { OrderValidation } from 'src/app/Validators/Order.validator';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  today: Date = new Date();
  isAvailable: boolean;

  currCar: Car;
  currRental: Rental;
  orderForm: FormGroup = new FormGroup({
    startDate: new FormControl(this.today, Validators.required),
    endDate: new FormControl(this.today, Validators.required)
  }, {validators: OrderValidation.checkDates});

  constructor(
    private alertService: AlertService,
    private carService: CarsService,
    private routing: RoutingService,
    private rentalService: RentalformService,
    private orderService: OrderService,
    private dateAdapter: DateAdapter<Date>) {
    this.carService.getCurrentCar().subscribe(car => {
      if (car !== undefined && car !== null) {
        this.currCar = car;
      } else {
        routing.setRoute('/home');
      }
    });
    this.dateAdapter.setLocale('en-GB');
   }

  ngOnInit() {
  }

  async checkIfAvailable() {
    const statusAlert: Alert = new Alert();
    statusAlert.isLoader = false;

    if (this.orderForm.valid) {
      const sDate: Date = new Date(this.orderForm.value.startDate);
      const eDate: Date = new Date(this.orderForm.value.endDate);
      this.isAvailable = await this.orderService.checkIfCarIsAvailable(this.currCar, sDate, eDate);
      statusAlert.message = this.isAvailable ? 'Dates are free!' : 'Dates are taken or car was not yet returned!';
    } else {
      statusAlert.message = 'Dates are invalid!';
    }
    this.alertService.subject.next(statusAlert);
  }

  async confirmOrder() {

  }
}
