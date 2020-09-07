import { UrlService } from './url.service';
import { LoginResponse } from './../../models/LoginResponse';
import { Observable } from 'rxjs';
import { Credentials } from './../../models/Credentials';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public token: string;
  public type: string;
  public email: string;
  public password: string;
  public isLoggedIn = false;

  public constructor(
    private httpClient: HttpClient,
    private urlService: UrlService
  ) {}

  public loginRequest(credentials: Credentials): Observable<LoginResponse> {
    this.email = credentials.email;
    this.password = credentials.password;
    this.type = credentials.type;
    if (this.type === 'Admin') {
      return this.httpClient.get('../../assets/json/login-result.json');
    }
    if (this.type === 'Company') {
      return this.httpClient.get('../../assets/json/login-result-company.json');
    }
    if (this.type === 'Customer') {
      return this.httpClient.get(
        '../../assets/json/login-result-customer.json'
      );
    }

    //this is for access the server side:
    
    /*const correctUrl =
      this.urlService.getUrl(credentials.type.toLowerCase()) +
      '/login?email=' +
      credentials.email +
      '&password=' +
      credentials.password;
    return this.httpClient.post(correctUrl, null);*/
  }
}
