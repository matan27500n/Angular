import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from './../../models/coupon';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private companyService: CompanyService,private activateRoute :ActivatedRoute) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.companyService.getCompanyCoupons(this.id).subscribe(
      (res) => {
        this.coupons = res;
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
