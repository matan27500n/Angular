import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.css'],
})
export class CustomerPurchaseComponent implements OnInit {
  public emptyArray: Coupon[] = [];
  public flag = false;
  public id: number;
  public coupons: Coupon[];
  public couponsCustomer: Coupon[] = [];
  public tempCoupons: Coupon[] = [];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private customerService: CustomerService,
    private adminService: AdminService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.tempCoupons = [];
    this.couponsCustomer = [];
    this.customerService.getCustomerCoupons(this.id).subscribe(
      (res) => {
        this.couponsCustomer = res;
        console.log(this.couponsCustomer.length);
      },
      (err) => {
        alert(err.message);
      }
    );
    this.coupons = [];
    this.adminService.getCoupons().subscribe(
      (res) => {
        this.coupons = res;
        this.tempCoupons = [];
        for (let i = 0; i < this.coupons.length; i++) {
          for (let j = 0; j < this.couponsCustomer.length; j++) {
            if (this.coupons[i].id === this.couponsCustomer[j].id) {
              this.flag = true;
              console.log(this.coupons[i].id);
            }
          }
          if (this.flag === false) {
            this.tempCoupons.push(this.coupons[i]);
          }
          this.flag = false;
        }
       if(this.tempCoupons.length === this.emptyArray.length){
        this.tempCoupons = [];
        this.flag = false;
         alert('There are no coupons available');
          this.router.navigateByUrl('/customer');
        }
        
        this.displayedColumns3 = [
          'id',
          'companyID',
          'categoryID',
          'title',
          'description',
          'startDate',
          'endDate',
          'amount',
          'price',
          'image',
          'Actions',
        ];
        this.dataSource3 = new MatTableDataSource(this.tempCoupons);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  public purchaseCoupon(coupon: Coupon): void {
    this.customerService.purchaseCoupon(coupon).subscribe(
      (res) => {
        alert('purchase successfully!!!');
        this.tempCoupons = this.tempCoupons.filter(
          (coupons) => coupons.id !== coupon.id
        );
        this.displayedColumns3 = [
          'id',
          'companyID',
          'categoryID',
          'title',
          'description',
          'startDate',
          'endDate',
          'amount',
          'price',
          'image',
          'Actions',
        ];
        this.dataSource3 = new MatTableDataSource(this.tempCoupons);
      },
      (err) => {
        alert('Coupon had already purchased, you can not buy this coupon');
      }
    );
  }
}
