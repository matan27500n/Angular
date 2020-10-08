import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css'],
})
export class CustomerCouponsComponent implements OnInit {
  public id: number;
  public coupons: Coupon[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Coupon>;
  constructor(
    private customerService: CustomerService,
    private activateRoute: ActivatedRoute,
    private location2: Location
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.customerService.getCustomerCoupons(this.id).subscribe(
      (res) => {
        this.coupons = res;
        if(Array.isArray(this.coupons) && this.coupons.length === 0){
          setTimeout(() => {
            this.location2.back();
            alert('Sorry, This customer has no coupons purchased');
          }, 100);
        }
        this.displayedColumns = [
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
        ];
        this.dataSource = new MatTableDataSource(this.coupons);
      },
      (err) => {
        err.message;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
