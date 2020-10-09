import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from './../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Coupon } from 'src/app/models/coupon';

export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  actions: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  public id: number;
  public customer: Customer[] = [];
  public email: string;
  public password: string;
  public customers: Customer[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Customer>;
  public coupons: Coupon[];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private adminService: AdminService,
    private customerService: CustomerService,
    private loginService: LoginService,
    private companyService: CompanyService,
    private location2: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.loginService.email;
    this.password = this.loginService.password;
    this.customerService
      .getCustomerByEmailAndPassword(this.email, this.password)
      .subscribe(
        (res) => {
          this.id = res.id;
          this.customer.push(res);
          this.displayedColumns = [
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
            'Actions',
          ];
          this.dataSource = new MatTableDataSource(this.customer);
          this.customerService.getCustomerCoupons(this.id).subscribe(
            (res) => {
              this.coupons = res;
              this.displayedColumns3 = [
                'id',
                'companyID',
                'categoryID',
                'title',
                'description',
                'startDate',
                'endDate',
                'amount',
                'price',
                'image',
                'Actions',
              ];
              this.dataSource3 = new MatTableDataSource(this.coupons);
            },
            (err) => {
              alert(err.message);
            }
          );
        },
        (err) => {
          alert(err.message);
        }
      );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  public deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.adminService.deleteCustomer(id).subscribe(
        (res) => {
          this.customer = this.customer.filter(
            (customer) => customer.id !== id
          );
          this.loginService.isLoggedIn = false;
          this.loginService.email = '';
          this.loginService.password = '';
          this.loginService.type = '';
          this.loginService.token = '';
          this.router.navigateByUrl('/login');
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }

  public deleteCoupon(id: number): void {
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.companyService.deleteCoupon(id).subscribe(
        (res) => {
          this.coupons = this.coupons.filter((coupon) => coupon.id !== id);
          this.displayedColumns3 = [
            'id',
            'companyID',
            'categoryID',
            'title',
            'description',
            'startDate',
            'endDate',
            'amount',
            'price',
            'image',
            'Actions',
          ];
          this.dataSource3 = new MatTableDataSource(this.coupons);
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }
}
