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
