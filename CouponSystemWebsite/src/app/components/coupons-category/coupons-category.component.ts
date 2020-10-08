import { Category } from './../../models/category';
import { AdminService } from 'src/app/services/admin.service';
import { Coupon } from './../../models/coupon';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coupons-category',
  templateUrl: './coupons-category.component.html',
  styleUrls: ['./coupons-category.component.css'],
})
export class CouponsCategoryComponent implements OnInit {
  public categoryID: Category;
  public coupons: Coupon[] = [];
  displayedColumns3: string[];
  dataSource3: MatTableDataSource<Coupon>;
  constructor(
    private companyService: CompanyService,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.categoryID = activateRoute.snapshot.params.categoryID;
  }

  ngOnInit(): void {
    this.companyService.getCompanyCouponsCategory(this.categoryID).subscribe(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          this.coupons.push(res[i]);
        }
        console.log('Category by: ' + this.coupons);
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
