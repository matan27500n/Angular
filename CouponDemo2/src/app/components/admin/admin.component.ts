import { Company } from './../../models/company';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public companies: Company[];

  public constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
