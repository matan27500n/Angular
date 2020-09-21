import { CouponDataService } from './../../services/coupon-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-coupon-add-and-update',
  templateUrl: './coupon-add-and-update.component.html',
  styleUrls: ['./coupon-add-and-update.component.css'],
})
export class CouponAddAndUpdateComponent implements OnInit {
  public type: string = 'Add';
  public id: number;
  public coupon = new Coupon();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private couponDataService: CouponDataService
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
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

  public addOrUpdateCompany(): void {
    if (this.id === 0) {
      JSON.stringify(this.coupon);
      this.adminService.addCoupon(this.coupon).subscribe(
        (res) => {
          alert('Coupon added!')
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      JSON.stringify(this.coupon);
      this.adminService.updateCoupon(this.coupon).subscribe(
        (res) => {
          alert('Coupon updated');
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/coupon');
  }
}
