import { Customer } from './../models/customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestCustomerApiService {
  constructor(private httpClient: HttpClient) {}

  public getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>('../../assets/json/customer.json');
  }
}
