import { Credentials } from './../../../models/Credentials';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials = new Credentials();
  constructor() { }

  ngOnInit(): void {
  }

  public loginToServer(): void{
    
  }

}
