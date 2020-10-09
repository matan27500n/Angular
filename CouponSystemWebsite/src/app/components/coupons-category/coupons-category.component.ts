import { Customer } from './../../models/customer';
import { Company } from 'src/app/models/company';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';
import { Category } from './../../models/category';
import { AdminService } from 'src/app/services/admin.service';
import { Coupon } from './../../models/coupon';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coupons-category',
  templateUrl: './coupons-category.component.html',
  styleUrls: ['./coupons-category.component.css'],
})
export class CouponsCategoryComponent implements OnInit {
  public email: string;
  public password: string;
  public company: Company;
  public customer: Customer;
  public id: number;
  public categoryID: Category;
  public coupons: Coupon[] = [];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private companyService: CompanyService,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private loginService: LoginService,
    private customerService: CustomerService
  ) {
    this.categoryID = activateRoute.snapshot.params.categoryID;
  }

  ngOnInit(): void {
    if (this.loginService.type === 'Company') {
      this.email = this.loginService.email;
      this.password = this.loginService.password;
      this.companyService
        .getCompanyByEmailAndPassword(this.email, this.password)
        .subscribe(
          (res) => {
            this.company = res;
            this.id = this.company.id;
            this.companyService
              .getCompanyCouponsCategory(this.categoryID, this.id)
              .subscribe(
                (res) => {
                  if (res.length !== null) {
                    for (let i = 0; i < res.length; i++) {
                      this.coupons.push(res[i]);
                    }
                  } else {
                    this.coupons = [];
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
                },
                (err) => {
                  alert('something was wrong..');
                }
              );
          },
          (err) => {
            alert(err.message);
          }
        );
    }
    if (this.loginService.type === 'Customer') {
      this.email = this.loginService.email;
      this.password = this.loginService.password;
      this.customerService
        .getCustomerByEmailAndPassword(this.email, this.password)
        .subscribe(
          (res) => {
            this.customer = res;
            this.id = this.customer.id;
            this.customerService
              .getCustomerCouponsByCategory(this.categoryID, this.id)
              .subscribe(
                (res) => {
                  if (res !== null) {
                    for (let i = 0; i < res.length; i++) {
                      this.coupons.push(res[i]);
                    }
                  } else {
                    this.coupons = [];
                  }
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
