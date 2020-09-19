import { Customer } from './../models/customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  public customers: Customer[];
  public constructor() {}

  public setCustomers(customers: Customer[]): void {
    this.customers = customers;
  }

  public getCustomers(): Customer[] {
    return this.customers;
  }
}
