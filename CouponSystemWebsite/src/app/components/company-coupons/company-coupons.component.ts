import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from './../../models/coupon';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css'],
})
export class CompanyCouponsComponent implements OnInit {
  public id: number;
  public coupons: Coupon[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Coupon>;
  public constructor(
    private companyService: CompanyService,
    private activateRoute: ActivatedRoute,
    private location2: Location
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.companyService.getCompanyCoupons(this.id).subscribe(
      (res) => {
        this.coupons = res;
        if (Array.isArray(this.coupons) && this.coupons.length === 0) {
          setTimeout(() => {
            this.location2.back();
            alert('Sorry, there are no coupons available for this company');
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
        alert(err.message);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
