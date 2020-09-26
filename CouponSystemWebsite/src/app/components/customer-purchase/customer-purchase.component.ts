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
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private customerService: CustomerService,
    private adminService: AdminService,
    private activateRoute: ActivatedRoute
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
    alert("cusotme id:" + this.id);
  }

  ngOnInit(): void {
    this.adminService.getCoupons().subscribe(
      (res) => {
        this.coupons = res;
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
    this.customerService.updateCustomerID(this.id).subscribe(
      (res) => {
        alert('customerID For purchase:' + res.id);
      },
      (err) => {
        alert('something was wrong...');
      }
    );
    this.customerService.purchaseCoupon(coupon).subscribe(
      (res) => {
        alert('purchase successfully!!!');
      },
      (err) => {
        alert('something was wrong..');
      }
    );
  }
}
