import { Rental } from './../../Models/Rental.class';
import { FormGroup, FormControl } from '@angular/forms';
import { RoutingService } from 'src/app/services/routing.service';
import { CarsService } from './../../services/cars.service';
import { Car } from './../../Models/Cars.class';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  currCar: Car;
  currRental: Rental;
  orderForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(private carService: CarsService, private routing: RoutingService) {
    this.carService.getCurrentCar().subscribe(car => {
      if (car !== undefined && car !== null) {
        this.currCar = car;
      } else {
        routing.setRoute('/home');
      }
    });
   }

  ngOnInit() {
  }

}
