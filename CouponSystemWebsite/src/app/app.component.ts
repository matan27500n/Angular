import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';
import { CompanyService } from './services/company.service';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public constructor(
    private loginService: LoginService,
    private router: Router,
    private adminService: AdminService,
    private companyService: CompanyService,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {}
  title = 'CouponSystemWebsite';

  public showLogOutDialog(): void {
    if (confirm('Are you sure you want to log out?')) {
      if (this.loginService.type == 'Administrator') {
        this.adminService.logout().subscribe(
          (res) => {},
          (err) => {
            alert(err.message);
          }
        );
      } else {
        if (this.loginService.type == 'Company') {
          this.companyService.logout().subscribe(
            (res) => {},
            (err) => {}
          );
        } else {
          this.customerService.logout().subscribe(
            (res) => {},
            (err) => {}
          );
        }
      }
      this.loginService.token = '';
      this.loginService.type = '';
      this.loginService.isLoggedIn = false;
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }
  public isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }
  public sayHello(): string {
    return this.loginService.email;
  }
  public getType(): string {
    return this.loginService.type;
  }
}
