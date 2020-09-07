import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  public baseUrl = 'http://localhost:8080';
  public admin = '/admin/';
  public company = '/company/';
  public customer = '/customer/';
  constructor() {}

  public getAdminUrl(): string {
    return this.baseUrl + this.admin;
  }
  public getCompanyUrl(): string {
    return this.baseUrl + this.company;
  }
  public getCustomerUrl(): string {
    return this.baseUrl + this.customer;
  }

  public getUrl(type: string): string {
    switch (type) {
      case 'admin':
        return this.getAdminUrl();
      case 'company':
        return this.getCompanyUrl();
      case 'customer':
        return this.getCustomerUrl();
    }
  }
}
