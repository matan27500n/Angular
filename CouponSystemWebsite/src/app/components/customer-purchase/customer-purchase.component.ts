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
  public coupons: Coupon[];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private customerService: CustomerService,
    private adminService: AdminService
  ) {}

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

  public purchaseCoupon(coupon: Coupon, id: number): void {
    alert(id);
    this.customerService.purchaseCoupon(coupon,id).subscribe(
      (res) => {},
      () => {}
    );
  }
}
