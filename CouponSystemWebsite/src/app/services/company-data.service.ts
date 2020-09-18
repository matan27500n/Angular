import { Company } from './../models/company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyDateService {
  public companies: Company[];
  public constructor() {}

  public setCompanies(companies: Company[]): void {
    this.companies = companies;
  }

  public getCompanies(): Company[] {
    return this.companies;
  }
}
