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
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.delete<any>(
      'http://localhost:8080/company/logout',
      options
    );
  }

  public getCompanyCoupons(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Coupon[]>(
      'http://localhost:8080/company/getCompanyCoupons/' + id,
      options
    );
  }

  public getCompanyByEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyByEmailAndPassword/' +
        email +
        '/' +
        password,
      options
    );
  }

  public getCompanyIdByEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyIdByEmailAndPassword/' +
        email +
        '/' +
        password,
      options
    );
  }

  public getCompanyDetails(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<Company>(
      'http://localhost:8080/company/getCompanyDetails/' + id,
      options
    );
  }

  public getCompanyCouponsCategory(categoryID: Category): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyCouponsCategory/' + categoryID,
      options
    );
  }

  public getCompanyCouponsMaxPrice(price: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.get<any>(
      'http://localhost:8080/company/getCompanyCouponsMaxPrice/' + price,
      options
    );
  }

  public addCoupon(coupon: Coupon): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.post<any>(
      'http://localhost:8080/company/addCoupon/',
      coupon,
      options
    );
  }

  public updateCoupon(coupon: Coupon): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.put<any>(
      'http://localhost:8080/company/updateCoupon',
      coupon,
      options
    );
  }

  public deleteCoupon(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Coupon-System-Header': this.tokenManager.getToken(),
    });
    const options = { headers: headers };
    return this.httpClient.delete<any>(
      'http://localhost:8080/company/deleteCoupon/' + id,
      options
    );
  }
}
