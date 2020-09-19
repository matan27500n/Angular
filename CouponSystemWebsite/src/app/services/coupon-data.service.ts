import { Coupon } from './../models/coupon';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CouponDataService {
  public coupons: Coupon[];
  constructor() {}

  public setCoupons(coupons: Coupon[]): void {
    this.coupons = coupons;
  }
  public getCoupons(): Coupon[] {
    return this.coupons;
  }
}
