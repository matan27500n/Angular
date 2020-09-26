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
    return this.httpClient.put<any>(
      'http://localhost:8080/customer/updateCustomerID/' + id,
      null
    );
  }

  public purchaseCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/customer/purchaseCoupon/',
      coupon
    );
  }
}
