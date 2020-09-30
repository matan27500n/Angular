import { TokenManagerService } from './token-manager.service';
import { Coupon } from './../models/coupon';
import { Customer } from './../models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from './../models/company';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(
    private httpClient: HttpClient,
    private tokenManager: TokenManagerService
  ) {}

  public getCompanies(): Observable<Company[]> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Company[]>(
      'http://localhost:8080/admin/GetAllCompanies',
      options
    );
  }

  public getOneCompany(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Company>(
      'http://localhost:8080/admin/getOneCompany/' + id,
      options
    );
  }

  public deleteCompany(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.delete<any>(
      'http://localhost:8080/admin/deleteCompany/' + id,
      options
    );
  }

  public addCompany(company: Company): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.post<any>(
      'http://localhost:8080/admin/addCompany/',
      company,
      options
    );
  }

  public updateCompany(company: Company): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.put<any>(
      'http://localhost:8080/admin/updateCompany/',
      company,
      options
    );
  }

  public getCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Customer[]>(
      'http://localhost:8080/admin/getAllCustomers',
      options
    );
  }

  public getOneCustomer(id: number): Observable<Customer> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Customer>(
      'http://localhost:8080/admin/getOneCustomer/' + id,
      options
    );
  }

  public deleteCustomer(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.delete<any>(
      'http://localhost:8080/admin/deleteCustomer/' + id,
      options
    );
  }

  public addCustomer(customer: Customer): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.post<any>(
      'http://localhost:8080/admin/addCustomer/',
      customer,
      options
    );
  }

  public updateCustomer(customer: Customer): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.put<any>(
      'http://localhost:8080/admin/updateCustomer/',
      customer,
      options
    );
  }

  public getCoupons(): Observable<Coupon[]> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/admin/getAllCoupons',
      options
    );
  }

  public getOneCoupon(id: number): Observable<Coupon> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Coupon>(
      'http://localhost:8080/admin/getOneCoupon/' + id,
      options
    );
  }
}
