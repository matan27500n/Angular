import { Coupon } from './../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManagerService } from './token-manager.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient,
    private tokenManager: TokenManagerService
  ) {}

  public getCustomerCoupons(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/customer/customerCoupons/' + id,
      options
    );
  }

  public updateCustomerID(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.put<any>(
      'http://localhost:8080/customer/updateCustomerID/' + id,
      null,
      options
    );
  }

  public purchaseCoupon(coupon: Coupon): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.post<any>(
      'http://localhost:8080/customer/purchaseCoupon/',
      coupon,
      options
    );
  }

  public getCustomerByEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<any>(
      'http://localhost:8080/customer/getCustomerByEmailAndPassword/' +
        email +
        '/' +
        password,
      options
    );
  }
}
