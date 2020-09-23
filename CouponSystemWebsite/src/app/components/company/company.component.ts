import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  name: number;
  email: number;
  password: string;
  actions: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  private companies: Company[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Company>;
  public constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;

        this.displayedColumns = ['id', 'name', 'email', 'password', 'Actions'];
        this.dataSource = new MatTableDataSource(this.companies);
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

  public deleteCompany(id: number): void {
    this.adminService.deleteCompany(id).subscribe(
      (res) => {
        this.companies = res;
        alert('delete successfully!!');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
