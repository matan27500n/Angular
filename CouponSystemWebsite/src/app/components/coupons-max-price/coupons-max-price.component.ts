import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-coupons-max-price',
  templateUrl: './coupons-max-price.component.html',
  styleUrls: ['./coupons-max-price.component.css'],
})
export class CouponsMaxPriceComponent implements OnInit {
  public price: number;
  public coupons: Coupon[] = [];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private companyService: CompanyService,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.price = activateRoute.snapshot.params.price;
  }

  ngOnInit(): void {
    this.companyService.getCompanyCouponsMaxPrice(this.price).subscribe(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          this.coupons.push(res[i]);
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
        this.dataSource3 = new MatTableDataSource(this.coupons);
      },
      (err) => {
        alert('something wrong');
      }
    );
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  public deleteCoupon(id: number): void {
    this.companyService.deleteCoupon(id).subscribe(
      (res) => {
        this.coupons = res;
        alert('deleting successfully!!');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
