import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    const expectedRole = route.data.expectedRole;
    const userRole = await this.authService.getRole();
    console.log('RoleGuard: ' + JSON.stringify(userRole));
    if (expectedRole !== userRole || userRole !== 'Admin') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
