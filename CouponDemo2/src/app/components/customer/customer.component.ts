import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  public customers: Customer[];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (err) => {
        err.message;
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
}
