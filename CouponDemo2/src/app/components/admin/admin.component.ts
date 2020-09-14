import { Coupon } from './../../models/coupon';
import { Customer } from './../../models/customer';
import { Company } from './../../models/company';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public companies: Company[];
  public customers: Customer[];
  public coupons: Coupon[];

  public constructor(private adminService: AdminService) {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        JSON.stringify(this.companies);
        this.companies = companies;
      },
      (err) => {
        alert(err.message);
      }
    );
    this.adminService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (err) => {
        err.message;
      }
    );
    this.adminService.getCoupons().subscribe(
      (coupons) => {
        this.coupons = coupons;
      },
      (err) => {
        err.message;
      }
    );
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
        err.message;
      }
    );
  }
  public deleteCoupon(id: number): void {
    this.adminService.deleteCoupon(id).subscribe(
      (res) => {
        this.coupons = this.coupons.filter((coupon) => coupon.id !== id);
      },
      (err) => {
        err.message;
      }
    );
  }
}
