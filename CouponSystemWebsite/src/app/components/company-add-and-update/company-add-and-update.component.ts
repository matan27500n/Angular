import { CompanyService } from 'src/app/services/company.service';
import { AppComponent } from './../../app.component';
import { LoginService } from './../../services/login.service';
import { CompanyDateService } from './../../services/company-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-add-and-update',
  templateUrl: './company-add-and-update.component.html',
  styleUrls: ['./company-add-and-update.component.css'],
})
export class CompanyAddAndUpdateComponent implements OnInit {
  public companies: Company[] = [];
  public type: string = 'Add';
  public id: number;
  public company = new Company();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private loginService: LoginService,
    private appComponent: AppComponent,
    private companyService: CompanyService
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    console.log('the type: ' + this.loginService.type);
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Company');
      this.adminService.getOneCompany(this.id).subscribe(
        (res) => {
          this.company.id = res.id;
          this.company.name = res.name;
          this.company.email = res.email;
          this.company.password = res.password;
        },
        (err) => {
          alert('something was wrong, please sign in again');
          this.appComponent.resetDate();
        }
      );
    } else {
      this.title.setTitle('Adding Company');
      this.type = 'Add';
    }
  }

  public addOrUpdateCompany(): void {
    this.adminService.getCompanies().subscribe(
      (res) => {
        this.companies = res;
      },
      (err) => {
        alert('something was wrong, please sign in again');
        this.appComponent.resetDate();
      }
    );

    if (this.id === 0) {
      this.adminService.addCompany(this.company).subscribe(
        (res) => {
          alert('company added successfully!!');
          this.route.navigateByUrl('/admin');
        },
        (err) => {
          alert('something was wrong, please sign in again');
            this.appComponent.resetDate();
        }
      );
    } else {
      if (this.loginService.type === 'Administrator') {
        this.adminService.updateCompany(this.company).subscribe(
          (res) => {
            alert('company updated successfully!!');
            this.route.navigateByUrl('/admin');
          },
          (err) => {
            alert('something was wrong, please sign in again');
            this.appComponent.resetDate();
          }
        );
      } else {
        this.companyService.updateCompany(this.company).subscribe(
          (res) => {
            alert('company updated successfully!!');
            this.route.navigateByUrl('/company');
          },
          (err) => {
            alert('something was wrong, please sign in again');
            this.appComponent.resetDate();
          }
        );
      }
    }
  }
}
