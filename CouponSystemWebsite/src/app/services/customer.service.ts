import { Coupon } from './../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  public getCustomerCoupons(id: number): Observable<any> {
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/customer/customerCoupons/' + id
    );
  }

  public updateCustomerID(id: number): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/customer/updateCustomerID/' + id
    );
  }

  public purchaseCoupon(coupon: Coupon, id: number): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/customer/purchaseCoupon/' + id,
      coupon
    );
  }
}