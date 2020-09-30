import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from './../../models/coupon';
import { Customer } from './../../models/customer';
import { Company } from './../../models/company';
import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  public constructor(private adminService: AdminService, private companyService: CompanyService) {}

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
        this.companies = this.companies.filter((company) => company.id !== id);
        this.displayedColumns = ['id', 'name', 'email', 'password', 'Actions'];
        this.dataSource = new MatTableDataSource(this.companies);
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
        this.customers = this.customers.filter((customer)=> customer.id !== id);
        this.displayedColumns2 = [
          'id',
          'firstName',
          'lastName',
          'email',
          'password',
          'Actions',
        ];
        this.dataSource2 = new MatTableDataSource(this.customers);
        alert('deleting successfully!!');
      },
      (err) => {
        alert(err.message);
      }
    );
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
        alert('deleting successfully!!');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
