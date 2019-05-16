import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
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

  constructor() { }

  ngOnInit() {
  }

  applyFilter(s: string) {

  }
}
