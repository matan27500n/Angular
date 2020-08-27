import { error } from '@angular/compiler/src/util';
import { Company } from './../../models/company';
import { RestCompanyApiService } from './../../services/rest-company-api.service';
import { CompanyService } from './../../services/company.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public x: number;
  public flag: boolean = false;
  public companies: Company[];

  public constructor(
    private title: Title,
    private companyNumber: CompanyService,
    private restCompanyApi: RestCompanyApiService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Company');
    this.companyNumber.updateNumber(22);
    this.x = this.companyNumber.getNumber();
  }

  public getAllCompanies(): void {
    this.flag = true;
    this.restCompanyApi.getCompanies().subscribe(
      (Company) => {
        this.companies = this.companies;
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
