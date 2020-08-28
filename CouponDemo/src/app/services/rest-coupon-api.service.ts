import { Observable } from 'rxjs';
import { Coupon } from './../models/coupon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestCouponApiService {
  public constructor(private httpClient: HttpClient) {}

  public getCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>('../../assets/json/coupon.json');
  }
}
