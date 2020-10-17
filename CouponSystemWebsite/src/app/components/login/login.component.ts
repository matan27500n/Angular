import { HttpClient } from '@angular/common/http';
import { DevService } from './../../services/dev.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Credentials } from './../../models/Credentials';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginSuccess = false;
  public credentials = new Credentials();
  constructor(
    private loginService: LoginService,
    private router: Router,
    private devService: DevService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    //document.body.style.background = 'cornFlowerBlue';
  }

  public loginToServer(): void {
    this.loginService.loginRequest(this.credentials).subscribe(
      (loginResponse) => {
        this.loginSuccess = true;
        this.loginService.token = loginResponse.token;
        this.loginService.type = loginResponse.type;
        this.loginService.isLoggedIn = true;

        setTimeout(() => {
          this.router.navigateByUrl(this.credentials.type);
          //alert(this.loginService.token + ' ' + this.loginService.type);
        }, 1700);
      },
      (err) => {
        alert('Invalid email or password or type');
        this.loginService.isLoggedIn = false;
      }
    );
  }
  public isDev(): boolean {
    return this.devService.getDev();
  }
}
