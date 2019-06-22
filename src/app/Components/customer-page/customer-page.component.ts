import { RoutingService } from './../../services/routing.service';
import { CarsService } from './../../services/cars.service';
import { Car } from './../../Models/Cars.class';
import { Component, OnInit, HostBinding } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-customer-page',
// tslint:disable-next-line: use-host-property-decorator
  host: {
    class: 'bigComponent'
  },
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerPageComponent implements OnInit {
  searchCriteria: string[] = [
    'All',
    'Manufacturer',
    'Model',
    'Year',
    'Transmission',
    'Availability'
  ];

  carData: Car[] = [];
  dataSource: MatTableDataSource<Car>;
  columnsToDisplay = ['Image', 'Manufacturer', 'Model and Year' ];
  expandedCar: Car | null;
  isLoading = true;

  constructor(private carService: CarsService, private routing: RoutingService) { }

  ngOnInit() {
    this.isLoading = true;
    this.populateTable();
  }

  applyFilter(s: string) {

  }

  async populateTable() {

    this.carData = await this.carService.getCars();
    this.dataSource = new MatTableDataSource<Car>(this.carData);
    console.log(this.dataSource);
    this.isLoading = false;
  }

  onOrder(car: Car) {
    this.carService.setCurrentCar(car);
    this.routing.setRoute('/order');
  }
}
