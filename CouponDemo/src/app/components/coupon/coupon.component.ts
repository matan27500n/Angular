import { error } from '@angular/compiler/src/util';
import { RestCouponApiService } from './../../services/rest-coupon-api.service';
import { Coupon } from './../../models/coupon';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
})
export class CouponComponent implements OnInit {
  public flag3: boolean = false;
  public coupons: Coupon[];

  public constructor(
    private title: Title,
    private restCouponApi: RestCouponApiService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Coupon');
  }

  public getAllCoupons(): void {
    this.flag3 = true;
    this.restCouponApi.getCoupons().subscribe(
      (Coupon) => {
        this.coupons = Coupon;
      },
      (error) => {
        error.message();
      }
    );
  }
}
