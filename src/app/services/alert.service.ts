import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  subject: Subject<Alert> = new Subject<Alert>();

  constructor() { }
}

export class Alert {
  isLoader: boolean;
  message: string;
}
