import { Location } from '@angular/common';
import { CompanyService } from './../../services/company.service';
import { LoginService } from './../../services/login.service';
import { Credentials } from './../../models/Credentials';
import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/coupon';

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
  public id: number;
  public company: Company[] = [];
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
    private location2: Location
  ) {}

  ngOnInit(): void {
    this.email = this.loginService.email;
    console.log(this.email);
    this.password = this.loginService.password;
    console.log(this.password);
    this.companyService
      .getCompanyIdByEmailAndPassword(this.email, this.password)
      .subscribe(
        (res) => {
          this.id = res;
          console.log('the id: ' + this.id);
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

                  console.log(this.coupons);
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
                  alert('wrong!!');
                }
              );
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

  public deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.adminService.deleteCompany(id).subscribe(
        (res) => {
          this.company = this.company.filter(
            (company) => company.id !== id
          ); 
          this.displayedColumns = [
            'id',
            'name',
            'email',
            'password',
            'Actions',
          ];
          this.dataSource = new MatTableDataSource(this.company);
          this.coupons = this.coupons.filter((coupon) => coupon.companyID !== id);
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
          this.loginService.isLoggedIn = false;
          this.loginService.email = '';
          this.loginService.password = '';
          this.loginService.type = '';
          this.loginService.token = '';
          this.location2.back();
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }


  public deleteCoupon(id: number): void {
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
        alert(err.message);
      }
    );
  }
}
