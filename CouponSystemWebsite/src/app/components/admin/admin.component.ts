import { AppComponent } from './../../app.component';
import { LoginService } from './../../services/login.service';
import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from './../../models/coupon';
import { Customer } from './../../models/customer';
import { Company } from './../../models/company';
import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  panelOpenState = false;
  public company: Company[] = [];
  public customer: Customer[] = [];
  public companies: Company[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Company>;
  public customers: Customer[];
  displayedColumns2: string[];
  dataSource2: MatTableDataSource<Customer>;
  public coupons: Coupon[];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  public constructor(
    private router: Router,
    private adminService: AdminService,
    private companyService: CompanyService,
    private loginService: LoginService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllCustomers();
    this.getAllCoupons();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  public getAllCompanies(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.displayedColumns = ['id', 'name', 'email', 'password', 'Actions'];
        this.dataSource = new MatTableDataSource(this.companies);
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );
  }

  public getAllCustomers(): void {
    this.adminService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;

        this.displayedColumns2 = [
          'id',
          'firstName',
          'lastName',
          'email',
          'password',
          'Actions',
        ];
        this.dataSource2 = new MatTableDataSource(this.customers);
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );
  }

  public getAllCoupons(): void {
    this.adminService.getCoupons().subscribe(
      (coupons) => {
        this.coupons = coupons;
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
        ];
        this.dataSource3 = new MatTableDataSource(this.coupons);
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );
  }

  public getOneCompany(id: number): void {
    this.adminService.getOneCompany(id).subscribe(
      (res) => {
        if (this.company.length !== 0) {
          while (this.company.length !== 0) {
            this.company.pop();
          }
        }
        this.company.push(res);
        this.displayedColumns = ['id', 'name', 'email', 'password', 'Actions'];
        this.dataSource = new MatTableDataSource(this.company);
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );
  }

  public getOneCustomer(id: number): void {
    this.adminService.getOneCustomer(id).subscribe(
      (res) => {
        if (this.customer.length !== 0) {
          while (this.customer.length !== 0) {
            this.customer.pop();
          }
        }
        this.customer.push(res);
        this.displayedColumns2 = [
          'id',
          'firstName',
          'lastName',
          'email',
          'password',
          'Actions',
        ];
        this.dataSource2 = new MatTableDataSource(this.customer);
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );
  }

  public deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.adminService.deleteCompany(id).subscribe(
        (res) => {
          this.companies = this.companies.filter(
            (company) => company.id !== id
          );
          this.displayedColumns = [
            'id',
            'name',
            'email',
            'password',
            'Actions',
          ];
          this.dataSource = new MatTableDataSource(this.companies);
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
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
        }
      );
    }
  }

  public deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.adminService.deleteCustomer(id).subscribe(
        (res) => {
          this.customers = this.customers.filter(
            (customer) => customer.id !== id
          );
          this.displayedColumns2 = [
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
            'Actions',
          ];
          this.dataSource2 = new MatTableDataSource(this.customers);
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
          alert('deleting successfully!!');
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
        }
      );
    }
  }
}
