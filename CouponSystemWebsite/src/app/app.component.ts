import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public constructor(private loginService: LoginService,private router: Router) {}
  ngOnInit(): void {
  }
  title = 'CouponSystemWebsite';

  public showLogOutDialog(): void {
  }
  public isLoggedIn(): boolean {
    return true;
  }
  public sayHello(): string {
    return 'hello user';
  }
}
