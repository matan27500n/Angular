import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from './../../models/customer';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public type: string;
  public customer = new Customer();
  public company = new Company();
  message: any;

  constructor(
    private register: RegisterService,
    private activate: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.type = activate.snapshot.params.type;
    console.log('type: ' + this.type);
  }

  ngOnInit(): void {}

  public registerCompany(company: Company): void {
    this.register.registerCompany(company).subscribe(
      (res) => {
        alert('Hello ' + company.name + ', you registered successfully');
        this.router.navigateByUrl('/login');
      },
      (err) => {
        alert('something was wrong, please try again');
        location.reload();
      }
    );
  }

  public registerCustomer(customer: Customer): void {
    this.register.registerCustomer(customer).subscribe(
      (res) => {
        alert(
          'Hello ' +
            customer.first_name +
            ' ' +
            customer.last_name +
            ', you registered successfully'
        );
        this.router.navigateByUrl('/login');
      },
      (err) => {
        alert('something was wrong, please try again');
        location.reload();
      }
    );
  }
}
