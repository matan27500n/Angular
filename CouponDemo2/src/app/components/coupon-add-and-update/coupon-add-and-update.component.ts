import { CouponDataService } from './../../services/coupon-data.service';
import { AdminService } from './../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-add-and-update',
  templateUrl: './coupon-add-and-update.component.html',
  styleUrls: ['./coupon-add-and-update.component.css'],
})
export class CouponAddAndUpdateComponent implements OnInit {
  public type: string = 'Add';
  public id: number;
  public coupon = new Coupon();

  public constructor(
    private title: Title,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private couponDataService: CouponDataService
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Coupon');
      this.coupon.id = this.id;

      this.coupon = this.couponDataService
        .getCoupons()
        .filter((p) => p.id === this.coupon.id)[0];
    } else {
      this.title.setTitle('Adding Coupon');
      this.type = 'Add';
    }
  }
  public addOrUpdateCoupon(): void {
    if (this.id === 0) {
      this.adminService.addCoupon(this.coupon).subscribe(
        (res) => {
          alert('coupon added');
        },
        (err) => {
          err.message;
        }
      );
    } else {
      this.adminService.updateCoupon(this.coupon).subscribe(
        (res) => {
          alert('coupon updated');
        },
        (err) => {
          err.message;
        }
      );
    }
    this.route.navigateByUrl('/coupon');
  }
}
