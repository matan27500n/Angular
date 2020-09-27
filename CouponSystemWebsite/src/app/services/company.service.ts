import { Category } from './../models/category';
import { Company } from './../models/company';
import { Coupon } from './../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  public getCompanyCoupons(id: number): Observable<any> {
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/company/getCompanyCoupons/' + id
    );
  }

  public getCompanyByEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyByEmailAndPassword/' +
        email +
        '/' +
        password
    );
  }

  public getCompanyIdByEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyIdByEmailAndPassword/' +
        email +
        '/' +
        password
    );
  }

  public getCompanyDetails(id: number): Observable<any> {
    return this.httpClient.get<Company>(
      'http://localhost:8080/company/getCompanyDetails/' + id
    );
  }

  public getCompanyCouponsCategory(categoryID: Category): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyCouponsCategory/' + categoryID
    );
  }

  public getCompanyCouponsMaxPrice(price: number): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyCouponsMaxPrice/' + price
    );
  }
}
