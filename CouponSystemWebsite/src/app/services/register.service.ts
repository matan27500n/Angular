import { Customer } from './../models/customer';
import { Company } from './../models/company';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  public registerCompany(company: Company): Observable<any> {
    return this.httpClient.post<Company>(
      'http://localhost:8080/registerCompany',
      company
    );
  }

  public registerCustomer(customer: Customer): Observable<any> {
    return this.httpClient.post<Customer>(
      'http://localhost:8080/registerCustomer',
      customer
    );
  }
}
