import { Category } from './../../models/category';
import { AppComponent } from './../../app.component';
import { Location } from '@angular/common';
import { CompanyService } from './../../services/company.service';
import { LoginService } from './../../services/login.service';
import { Credentials } from './../../models/Credentials';
import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/coupon';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: number;
  name: number;
  email: number;
  password: string;
  actions: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public categories: string[] = ['Drinks', 'Pharmacy', 'Fast_food'];
  public couponsMaxPrice: Coupon[] = [];
  public couponsCategory: Coupon[] = [];
  public id: number;
  public company: Company[] = [];
  public coupon: Coupon[] = [];
  public email: string;
  public password: string;
  displayedColumns: string[];
  dataSource: MatTableDataSource<Company>;
  public coupons: Coupon[];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  public constructor(
    private adminService: AdminService,
    private loginService: LoginService,
    private companyService: CompanyService,
    private location2: Location,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.email = this.loginService.email;
    this.password = this.loginService.password;
    this.companyService
      .getCompanyIdByEmailAndPassword(this.email, this.password)
      .subscribe(
        (res) => {
          this.id = res;
          this.adminService.getOneCompany(this.id).subscribe(
            (res) => {
              this.company.push(res);
              this.displayedColumns = [
                'id',
                'name',
                'email',
                'password',
                'Actions',
              ];
              this.dataSource = new MatTableDataSource(this.company);
              this.companyService.getCompanyCoupons(this.id).subscribe(
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
                  alert('something was wrong, please sign in again');
                  this.appComponent.resetDate();
                }
              );
            },
            (err) => {
              alert('something was wrong, please sign in again');
              this.appComponent.resetDate();
            }
          );
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
        }
      );
  }

  public getCompaniesCoupons(): void {
    this.email = this.loginService.email;
    this.password = this.loginService.password;
    this.companyService
      .getCompanyIdByEmailAndPassword(this.email, this.password)
      .subscribe(
        (res) => {
          this.id = res;
          this.companyService.getCompanyCoupons(this.id).subscribe(
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
              alert('something was wrong, please sign in again');
              this.appComponent.resetDate();
            }
          );
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
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

  public getOneCoupon(id: number): void {
    this.companyService.getOneCoupon(id).subscribe(
      (res) => {
        if (this.coupon.length !== 0) {
          while (this.coupon.length !== 0) {
            this.coupon.pop();
          }
        }
        this.coupon.push(res);
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
        this.dataSource3 = new MatTableDataSource(this.coupon);
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );
  }

  public getCompanyCouponsCategory(categoryID: Category): void {
    this.companyService
      .getCompanyCouponsCategory(categoryID, this.id)
      .subscribe(
        (res) => {
          this.couponsCategory = res;
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
          this.dataSource3 = new MatTableDataSource(this.couponsCategory);
        },
        (err) => {
          alert(err.message());
        }
      );
  }

  public getCompanyCouponsMaxPrice(maxPrice: number): void {
    this.companyService.getCompanyCouponsMaxPrice(maxPrice, this.id).subscribe(
      (res) => {
        this.couponsMaxPrice = res;
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
        this.dataSource3 = new MatTableDataSource(this.couponsMaxPrice);
      },
      (err) => {
        alert(err.message());
      }
    );
  }

  public deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.adminService.deleteCompany(id).subscribe(
        (res) => {
          this.company = this.company.filter((company) => company.id !== id);
          this.displayedColumns = [
            'id',
            'name',
            'email',
            'password',
            'Actions',
          ];
          this.dataSource = new MatTableDataSource(this.company);
          this.coupons = this.coupons.filter(
            (coupon) => coupon.companyID !== id
          );
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
          this.appComponent.resetDate();
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
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
          alert('deleting successfully!');
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
        }
      );
    }
  }
}
