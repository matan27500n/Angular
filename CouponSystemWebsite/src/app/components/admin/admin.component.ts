import { Coupon } from './../../models/coupon';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public companies: Company[];
  public customers: Customer[];
  public coupons: Coupon[];
  public dataSource;
  public dataSource2;
  public dataSource3;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.dataSource = new MatTableDataSource(this.companies);
      },
      (err) => {
        alert(err.message);
      }
    );

    this.adminService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
        this.dataSource2 = new MatTableDataSource(this.customers);
      },
      (err) => {
        alert(err.message);
      }
    );

    this.adminService.getCoupons().subscribe(
      (coupons) => {
        this.coupons = coupons;
        this.dataSource3 = new MatTableDataSource(this.coupons);
      },
      (err) => {
        err.message;
      }
    );
  }
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Password', 'Actions'];
  displayedColumns2: string[] = [
    'Id',
    'First',
    'Last',
    'Email',
    'Password',
    'Actions',
  ];
  displayedColumns3: string[] = [
    'Id',
    'CompanyId',
    'CategoryId',
    'Title',
    'Description',
    'StartDate',
    'EndDate',
    'Amount',
    'Price',
    'Image',
    'Actions',
  ];
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
        this.companies = this.companies.filter((company) => company.id !== id);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public deleteCustomer(id: number): void {
    this.adminService.deleteCustomer(id).subscribe(
      (res) => {
        this.customers = this.customers.filter(
          (customer) => customer.id !== id
        );
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public deleteCoupon(id: number): void {
    this.adminService.deleteCoupon(id).subscribe(
      (res) => {
        this.coupons = this.coupons.filter((coupon) => coupon.id !== id);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
