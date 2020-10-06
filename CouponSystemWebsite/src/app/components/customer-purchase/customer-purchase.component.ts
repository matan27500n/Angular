import { ActivatedRoute } from '@angular/router';
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
  public id: number;
  public coupons: Coupon[];
  public couponsCustomer: Coupon[] = [];
  public tempCoupons: Coupon[] = [];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private customerService: CustomerService,
    private adminService: AdminService,
    private activateRoute: ActivatedRoute
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.tempCoupons = [];
    this.coupons = [];
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
      this.adminService.getCoupons().subscribe(
        (res) => {
          this.coupons = res;
          console.log(this.coupons.length);
          if (this.coupons !== null) {
            for (let i = 0; i < this.couponsCustomer.length; i++) {
              for (let j = 0; j < this.coupons.length; j++) {
                if (this.coupons[j].id !== this.couponsCustomer[i].id) {
                  this.tempCoupons.push(this.coupons[i]);
                }
              }
            }
          }
          this.coupons = this.tempCoupons;
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
          this.dataSource3 = new MatTableDataSource(this.coupons);
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
    // console.log(this.id);
    /*this.customerService.updateCustomerID(this.id).subscribe(
      (res) => {
        console.log('customerID: ' + this.id);
      },
      (err) => {
        alert('something was wrong...');
      }
    );*/
    this.customerService.purchaseCoupon(coupon).subscribe(
      (res) => {
        alert('purchase successfully!!!');
        this.coupons = this.coupons.filter(
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
        this.dataSource3 = new MatTableDataSource(this.coupons);
      },
      (err) => {
        alert('something was wrong..');
      }
    );
  }
}
