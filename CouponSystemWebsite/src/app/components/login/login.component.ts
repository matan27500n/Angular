import { HttpClient } from '@angular/common/http';
import { TokenManagerService } from './../../../../../CouponDemo2/src/app/services/token-manager.service';
import { DevService } from './../../services/dev.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Credentials } from './../../models/Credentials';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public token: string;
  public credentials: Credentials;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private devService: DevService,
    private tokenManager: TokenManagerService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {}

  public loginToServer(): void {
    this.loginService.loginRequest(this.credentials).subscribe(
      (loginResponse) => {
        this.loginService.token = loginResponse.token;
        this.loginService.type = loginResponse.type;
        this.loginService.isLoggedIn = true;
        this.router.navigateByUrl(this.loginService.type);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public isDev(): boolean {
    return this.devService.getDev();
  }
}
