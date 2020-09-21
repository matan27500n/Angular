import { MatTableDataSource } from '@angular/material/table';
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
  public dataSource;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (err) => {
        alert(err.message);
      }
    );
    this.dataSource = new MatTableDataSource(this.customers);
  }
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Password', 'Actions'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteCustomer(customer: Customer): void {
    this.adminService.deleteCustomer(customer).subscribe(
      (res) => {
        this.customers.filter((customer) => customer.id !== customer.id);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
