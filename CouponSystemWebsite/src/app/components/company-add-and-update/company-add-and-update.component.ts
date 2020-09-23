import { CompanyDateService } from './../../services/company-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-company-add-and-update',
  templateUrl: './company-add-and-update.component.html',
  styleUrls: ['./company-add-and-update.component.css'],
})
export class CompanyAddAndUpdateComponent implements OnInit {
  public type: string = 'Add';
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public company = new Company();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private companyDataService: CompanyDateService
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
    this.name = String(activatedRoute.snapshot.params.name);
    this.email = String(activatedRoute.snapshot.params.email);
    this.password = String(activatedRoute.snapshot.params.password);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Company');
      this.company.id = this.id;
      this.company.name = this.name;
      this.company.email = this.email;
      this.company.password = this.password;
      this.company = this.companyDataService
        .getCompanies()
        .filter((p) => p.id === this.company.id)[0];
    } else {
      this.title.setTitle('Adding Company');
      this.type = 'Add';
    }
  }

  public addOrUpdateCompany(): void {
    if (this.id === 0) {
      JSON.stringify(this.company);
      this.adminService.addCompany(this.company).subscribe(
        (res) => {
          res = this.company;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      JSON.stringify(this.company);
      this.adminService.updateCompany(this.company).subscribe(
        (res) => {
          res = this.company;
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/company');
  }
}
