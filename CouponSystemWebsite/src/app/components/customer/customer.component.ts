import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  actions: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  public customers: Customer[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Customer>;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;

        this.displayedColumns = ['id', 'firstName','lastName', 'email', 'password', 'Actions'];
        this.dataSource = new MatTableDataSource(this.customers);
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
}
