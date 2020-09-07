import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Credentials } from './../../../models/Credentials';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public credentials = new Credentials();
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  public loginToServer(): void {
    this.loginService.loginRequest(this.credentials).subscribe(
      (loginResponse) => {
        alert(loginResponse.token + ' ' + loginResponse.type);
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
}
