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

  public constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
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
      (res) => {this.customers},
      () => {}
    );
  }
}
