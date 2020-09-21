import { Company } from './../../models/company';
import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public companies: Company[];
  public dataSource;
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
    this.dataSource = new MatTableDataSource(this.companies);
  }

  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Password', 'Actions'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteCompany(id: number): void {
    this.adminService.deleteCompany(id).subscribe(
      (res) => {
        this.companies = this.companies.filter((company) => company.id !== id);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
