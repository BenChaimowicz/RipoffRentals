import { Router } from '@angular/router';
import { AlertService, Alert } from './../../services/alert.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fadeAnimation } from '../../animations/fade-animation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  animations: [fadeAnimation]
})
export class MainNavComponent {

  isTablet$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.TabletPortrait,
    Breakpoints.WebPortrait])
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loginService: LoginService,
    private alertService: AlertService,
    private routingService: RoutingService,
    private router: Router,
    public snackBar: MatSnackBar) {
    this.routingService.getRoute().subscribe(route => {
      this.router.navigateByUrl(route);
    });

    this.alertService.subject.subscribe(msg => {
      this.openSnackBar(msg);
    });
  }

  openSnackBar(alert: Alert) {
    if (!alert.isLoader) {
      this.snackBar.open(alert.message, 'x', { duration: 3000 });
    }
  }

  public getRouterOutletState(outlet): boolean {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
