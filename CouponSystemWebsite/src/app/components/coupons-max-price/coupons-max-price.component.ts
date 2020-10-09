import { Customer } from './../../models/customer';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-coupons-max-price',
  templateUrl: './coupons-max-price.component.html',
  styleUrls: ['./coupons-max-price.component.css'],
})
export class CouponsMaxPriceComponent implements OnInit {
  public customer: Customer;
  public company: Company;
  public id: number;
  public email: string;
  public password: string;
  public price: number;
  public coupons: Coupon[] = [];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private companyService: CompanyService,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private customerService: CustomerService,
    private loginService: LoginService,
    private location2: Location,
    private router: Router
  ) {
    this.price = activateRoute.snapshot.params.price;
  }

  ngOnInit(): void {
    this.email = this.loginService.email;
    this.password = this.loginService.password;
    if (this.loginService.type === 'Company')
      this.companyService
        .getCompanyByEmailAndPassword(this.email, this.password)
        .subscribe(
          (res) => {
            this.company = res;
            this.id = this.company.id;
            this.companyService
              .getCompanyCouponsMaxPrice(this.price, this.id)
              .subscribe(
                (res) => {
                  if (res.length === 0) {
                    alert('There are no coupons priceless then this');
                    this.loginService.type = 'Company';
                    this.router.navigateByUrl('/company');
                  } else {
                    for (let i = 0; i < res.length; i++) {
                      this.coupons.push(res[i]);
                    }
                    this.loginService.type = 'Company';
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
                  }
                },
                (err) => {
                  alert(err.message);
                }
              );
          },
          (err) => {
            alert('failed in: getCompanyByEmailAndPassword');
          }
        );
    if ((this.loginService.type = 'Customer')) {
      this.customerService
        .getCustomerByEmailAndPassword(this.email, this.password)
        .subscribe(
          (res) => {
            this.customer = res;
            this.id = this.customer.id;
            this.customerService
              .getCustomerCouponsByMaxPrice(this.price, this.id)
              .subscribe(
                (res) => {
                  if (res.length === 0) {
                    alert('There are no coupons priceless then this');
                    this.loginService.type = 'Customer';
                    this.router.navigateByUrl('/customer');
                  } else {
                    for (let i = 0; i < res.length; i++) {
                      this.coupons.push(res[i]);
                    }
                    this.loginService.type = 'Customer';
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
                  }
                },
                (err) => {
                  alert(err.message);
                  this.loginService.type = '';
                  this.router.navigateByUrl('/login');
                }
              );
          },
          (err) => {
            alert(err.message);
            this.loginService.type = '';
            this.router.navigateByUrl('/login');
          }
        );
    }
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  public deleteCoupon(id: number): void {
    this.companyService.deleteCoupon(id).subscribe(
      (res) => {
        this.coupons = res;
        alert('deleting successfully!!');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
