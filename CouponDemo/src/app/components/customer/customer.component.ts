import { error } from '@angular/compiler/src/util';
import { Customer } from './../../models/customer';
import { RestCustomerApiService } from './../../services/rest-customer-api.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  public flag2 = false;
  public customers: Customer[];

  public constructor(
    private title: Title,
    private restCustomerApi: RestCustomerApiService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Customer');
  }

  public getAllCustomers(): void {
    this.flag2 = true;
    this.restCustomerApi.getCustomers().subscribe(
      (Customer) => {
        this.customers = Customer;
      },
      (error) => {
        alert(error.message());
      }
    );
  }
}
