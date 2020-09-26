import { Coupon } from './../../models/coupon';
import { Customer } from './../../models/customer';
import { Company } from './../../models/company';
import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  name: number;
  email: number;
  password: string;
  actions: string;
}

export interface PeriodicElement3 {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  actions: string;
}

export interface PeriodicElement3 {
  id: number;
  companyID: number;
  categoryID: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
  actions: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  panelOpenState = false;
  public companies: Company[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Company>;
  public customers: Customer[];
  displayedColumns2: string[];
  dataSource2: MatTableDataSource<Customer>;
  public coupons: Coupon[];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  public constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.displayedColumns = ['id', 'name', 'email', 'password', 'Actions'];
        this.dataSource = new MatTableDataSource(this.companies);
      },
      (err) => {
        alert(err.message);
      }
    );

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
        alert(err.message);
      }
    );

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
          'Actions',
        ];
        this.dataSource3 = new MatTableDataSource(this.coupons);
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

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  public deleteCompany(id: number): void {
    this.adminService.deleteCompany(id).subscribe(
      (res) => {
        this.companies = res;
        alert('deleting successfully!');
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public deleteCustomer(id: number): void {
    this.adminService.deleteCustomer(id).subscribe(
      (res) => {
        this.customers = res;
        alert('deleting successfully!!');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  public deleteCoupon(id: number): void {
    this.adminService.deleteCoupon(id).subscribe(
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
