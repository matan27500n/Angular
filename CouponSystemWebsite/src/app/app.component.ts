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
  public typeOfSystem: string;
  public constructor(
    private loginService: LoginService,
    private router: Router,
    private adminService: AdminService,
    private companyService: CompanyService,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {}
  title = 'CouponSystemWebsite';

  html = document.getElementsByTagName('html')[0];
  toggleTheme = (theme) => {
    this.html.dataset.theme = theme;
  };

  public resetDate(): void {
    this.loginService.email = '';
    this.loginService.password = '';
    this.loginService.type = '';
    this.loginService.token = '';
    this.loginService.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  public changeColor(color: string): void {
    document.body.style.background = color;
  }

  public showLogOutDialog(): void {
    this.typeOfSystem = this.loginService.type;
    if (confirm('Are you sure you want to log out?') === true) {
      switch (this.typeOfSystem) {
        case 'Administrator':
          this.adminService.logout().subscribe(
            (res) => {
              console.log('admin');
            },
            (err) => {
              alert(err.message);
            }
          );
          break;
        case 'Company':
          this.companyService.logout().subscribe(
            (res) => {
              console.log('company');
            },
            (err) => {}
          );
          break;
        case 'Customer':
          this.customerService.logout().subscribe(
            (res) => {
              console.log('customer');
            },
            (err) => {}
          );
          break;
      }
      this.resetDate();
    } else {
      switch (this.typeOfSystem) {
        case 'Administrator':
          this.router.navigateByUrl('/admin');
          break;
        case 'Company':
          this.router.navigateByUrl('/company');
          break;
        case 'Customer':
          this.router.navigateByUrl('/customer');
          break;
        default:
          this.router.navigateByUrl('/***');
          break;
      }
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
