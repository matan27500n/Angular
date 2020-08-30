import { CompanyDataService } from './../../services/company-data.service';
import { CompaniesService } from './../../../../../Coupon/src/app/services/companies.service';
import { error } from '@angular/compiler/src/util';
import { Company } from './../../models/company';
import { RestCompanyApiService } from './../../services/rest-company-api.service';
import { CompanyService } from './../../services/company.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public x: number;
  public flag: boolean = false;
  public companies: Company[];

  @Input()
  public id2: number;

  public constructor(
    private title: Title,
    private companyNumber: CompanyService,
    private restCompanyApi: RestCompanyApiService,
    private companyDataService: CompanyDataService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Company');
    this.companyNumber.updateNumber(22);
    this.x = this.companyNumber.getNumber();
    this.restCompanyApi.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.companyDataService.setCompanies(companies);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public getAllCompanies(): void {
    this.flag = true;
    this.restCompanyApi.getCompanies().subscribe(
      (Company) => {
        this.companies = Company;
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  public addCompany(): void {
    alert('adding product');
  }

  public updateCompany(): void {}

  public deleteCompany(id: number): void {
    this.id2 = id;
    const deleteBoolean = confirm(
      'are you sure you want to delete company ' + id + ' ?'
    );
    if (deleteBoolean) {
      this.restCompanyApi.deleteCompany(id).subscribe(
        (res) => {
          this.companies = this.companies.filter(
            (company) => company.id !== id
          );
        },
        (err) => {
          alert(err.message);
          //we are doing this because we cannot delete from json file
          this.companies = this.companies.filter(
            (company) => company.id !== id
          );
        }
      );
    }
  }
  public getId(): number {
    return;
  }
}
