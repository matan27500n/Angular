import { CustomerService } from './../../services/customer.service';
import { LoginService } from './../../services/login.service';
import { CompanyService } from 'src/app/services/company.service';
import { Credentials } from './../../models/Credentials';
import { Company } from 'src/app/models/company';
import { CouponDataService } from './../../services/coupon-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coupon-add-and-update',
  templateUrl: './coupon-add-and-update.component.html',
  styleUrls: ['./coupon-add-and-update.component.css'],
})
export class CouponAddAndUpdateComponent implements OnInit {
  public coupons: Coupon[] = [];
  public company = new Company();
  public type: string = 'Add';
  public id: number;
  public coupon = new Coupon();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private couponDataService: CouponDataService,
    private loginService: LoginService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private location2: Location
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
      console.log('email: ' + this.loginService.email);
      this.companyService
        .getCompanyByEmailAndPassword(
          this.loginService.email,
          this.loginService.password
        )
        .subscribe(
          (res) => {
            this.company = res;
          },
          (err) => {
            alert('GetCompanyByEmailAndPassword failed..');
          }
        );
      this.title.setTitle('Adding Coupon');
      this.type = 'Add';
    }
  }

  public addOrUpdateCoupon(): void {
    if (this.id === 0) {
      if (this.type === 'company') {
        this.companyService.getCompanyCoupons(this.company.id).subscribe(
          (res) => {
            this.coupons = res;
          },
          (err) => {
            alert('getCompanyCoupons wrong..');
          }
        );
      }
      this.companyService.addCoupon(this.coupon).subscribe(
        (res) => {
          console.log('res: ' + res);
          alert('Coupon added successfully');
          this.companyService.getCompanyCoupons(this.company.id).subscribe(
            (res) => {
              this.coupons = res;
            },
            (err) => {
              alert('getCompanyCoupons wrong..');
            }
          );
        },
        (err) => {
          alert('You cannot add coupon with the same title');
        }
      );
    } else {
      this.companyService.updateCoupon(this.coupon).subscribe(
        (res) => {
          alert('Coupon update successfully!');
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.location2.back();
  }
}
