import { LoginService } from './login.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  public constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.loginService.type === 'admin' &&
      this.loginService.email === 'admin@admin.com' &&
      this.loginService.password === 'admin'
    ) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }
}
