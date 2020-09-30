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
    private location2: Location
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
          alert(err.message);
        }
      );
    } else {
      this.title.setTitle('Adding Company');
      this.type = 'Add';
    }
  }

  public addOrUpdateCompany(): void {
    this.adminService.getCompanies().subscribe(
      (res) => {this.companies = res},
      (err) => {alert("something was wrong..")}
    );

    if (this.id === 0) {
      this.adminService.addCompany(this.company).subscribe(
        (res) => {
          alert("company added successfully!!");
        },
        (err) => {
          alert("error with adding company, please try again");
        }
      );
    } else {
      this.adminService.updateCompany(this.company).subscribe(
        (res) => {
          console.log("the updated: " + res);
          alert("company updated successfully!!")
        },
        (err) => {
          alert(err.message);
        }
      );
     
    }
    this.location2.back();
  }
}
