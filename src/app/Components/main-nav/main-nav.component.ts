import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fadeAnimation } from '../../animations/fade-animation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

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

  loggedIn: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {}

  public getRouterOutletState(outlet): boolean {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
