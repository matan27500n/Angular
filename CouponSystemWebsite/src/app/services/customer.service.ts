import { Category } from './../models/category';
import { Coupon } from './../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManagerService } from './token-manager.service';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private tokenManager: TokenManagerService
  ) {}

  public logout(): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/customer/logout');
  }

  public getCustomerCoupons(id: number): Observable<any> {
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/customer/customerCoupons/' + id
    );
  }

  public updateCustomerID(id: number): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/customer/updateCustomerID/' + id,
      null
    );
  }

  public updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/customer/updateCustomer/',
      customer
    );
  }

  public purchaseCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/customer/purchaseCoupon/',
      coupon
    );
  }

  public getCustomerByEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/customer/getCustomerByEmailAndPassword/' +
        email +
        '/' +
        password
    );
  }

  public getCustomerCouponsByCategory(
    category: Category,
    id: number
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/customer/customerCouponsCategory/' +
        category +
        '/' +
        id
    );
  }

  public getCustomerCouponsByMaxPrice(
    maxPrice: number,
    id: number
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/customer/customerCouponsMaxPrice/' +
        maxPrice +
        '/' +
        id
    );
  }

  public deleteCoupon(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/customer/deleteCoupon/' + id
    );
  }
}
