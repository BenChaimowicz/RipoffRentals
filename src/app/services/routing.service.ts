import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  route: Subject<any> = new Subject<any>();

  constructor() { }

  getRoute(): Observable<any> {
    return this.route.asObservable();
  }

  setRoute(route: any) {
    this.route.next(route);
  }
}
