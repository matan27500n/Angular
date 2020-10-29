import { Category } from './../models/category';
import { Company } from './../models/company';
import { Coupon } from './../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManagerService } from './token-manager.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private httpClient: HttpClient,
    private tokenManager: TokenManagerService
  ) {}

  public logout(): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/company/logout');
  }

  public getOneCoupon(id: number): Observable<any> {
    return this.httpClient.get<Coupon>(
      'http://localhost:8080/company/getOneCoupon/' + id
    );
  }

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

  public updateCompany(company: Company): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/company/updateCompany/',
      company
    );
  }

  public setCompanyId(id: number): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/company/setCompanyId/' + id,
      null
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

  public getCompanyCouponsCategory(
    categoryID: Category,
    id: number
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyCouponsCategory/' +
        categoryID +
        '/' +
        id
    );
  }

  public getCompanyCouponsMaxPrice(price: number, id: number): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyCouponsMaxPrice/' +
        price +
        '/' +
        id
    );
  }

  public addCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/company/addCoupon/',
      coupon
    );
  }

  public updateCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.put<any>(
      'http://localhost:8080/company/updateCoupon',
      coupon
    );
  }

  public deleteCoupon(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/company/deleteCoupon/' + id
    );
  }
}
