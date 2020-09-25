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
      this.adminService.getOneCoupon(this.id).subscribe(
        (res) => {
          this.coupon.id = res.id;
          this.coupon.companyID = res.companyID;
          this.coupon.categoryID = res.categoryID;
          this.coupon.title = res.title;
          this.coupon.description = res.description;
          this.coupon.start_date = res.start_date;
          this.coupon.end_date = res.end_date;
          this.coupon.amount = res.amount;
          this.coupon.price = res.price;
          this.coupon.image = res.image;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.title.setTitle('Adding Coupon');
      this.type = 'Add';
    }
  }

  public addOrUpdateCoupon(): void {
    if (this.id === 0) {
      this.adminService.addCoupon(this.coupon).subscribe(
        (res) => {
          this.coupon === res;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.adminService.updateCoupon(this.coupon).subscribe(
        (res) => {
          this.coupon === res;
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/admin');
  }
}
