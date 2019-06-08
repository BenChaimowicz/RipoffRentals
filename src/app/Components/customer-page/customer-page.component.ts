import { CarsService } from './../../services/cars.service';
import { Car } from './../../Models/Cars.class';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-customer-page',
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
  dataSource: MatTableDataSource<Car[]>;
  columnsToDisplay = ['Manufacturer', 'Model + Year', 'Image'];
  expandedElement: Car | null;
  isLoading: boolean;

  constructor(private carService: CarsService) { }

  ngOnInit() {
    this.populateTable();
  }

  applyFilter(s: string) {

  }

  async populateTable() {
    this.carService.getCars().subscribe((data: Car[]) => {
      this.isLoading = true;
      this.carData = data;
    });
  }
}
