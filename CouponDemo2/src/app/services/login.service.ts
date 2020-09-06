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

  public constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public loginRequest(credentials: Credentials): Observable<LoginResponse> {
    return this.httpClient.get('../../assets/json/login-result.json');
  }
}
