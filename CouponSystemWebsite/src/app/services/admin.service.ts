import { Coupon } from './../models/coupon';
import { Customer } from './../models/customer';
import { HttpClient } from '@angular/common/http';
import { Company } from './../models/company';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(private httpClient: HttpClient) {}

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(
      'http://localhost:8080/admin/GetAllCompanies'
    );
  }

  public getOneCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(
      'http://localhost:8080/admin/getOneCompany/' + id
    );
  }

  public deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/admin/deleteCompany/' + id
    );
  }

  public addCompany(company: Company): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/admin/addCompany/',
      company
    );
  }

  public updateCompany(company: Company): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/admin/updateCompany/',
      company
    );
  }

  public getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      'http://localhost:8080/admin/getAllCustomers'
    );
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/admin/deleteCustomer/' + id
    );
  }

  public addCustomer(customer: Customer): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/admin/addCustomer/',
      customer
    );
  }

  public updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/admin/updateCustomer/',
      Customer
    );
  }

  public getCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/admin/getAllCoupons'
    );
  }
  public deleteCoupon(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/admin/deleteCoupon/' + id
    );
  }

  public addCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/company/addCoupon/',
      Coupon
    );
  }

  public updateCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/company/updateCoupon',
      Coupon
    );
  }
}
