import { CustomerDataService } from './../../services/customer-data.service';
import { AdminService } from 'src/app/services/admin.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-add-and-update',
  templateUrl: './customer-add-and-update.component.html',
  styleUrls: ['./customer-add-and-update.component.css'],
})
export class CustomerAddAndUpdateComponent implements OnInit {
  public type: string = 'Add';
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public customer = new Customer();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private customerDataService: CustomerDataService
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
    this.firstName = activatedRoute.snapshot.params.firstName;
    this.lastName = String(activatedRoute.snapshot.params.lastName);
    this.email = String(activatedRoute.snapshot.params.email);
    this.password = String(activatedRoute.snapshot.params.password)
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Customer');
      this.customer.id = this.id;
      this.customer.firstName = this.firstName;
      this.customer.lastName = this.lastName;
      this.customer.email = this.email;
      this.customer.password = this.password;
      this.customer = this.customerDataService
        .getCustomers()
        .filter((p) => p.id === this.customer.id)[0];
    } else {
      this.title.setTitle('Adding Customer');
      this.type = 'Add';
    }
  }

  public addOrUpdateCustomer(): void {
    if (this.id === 0) {
      JSON.stringify(this.customer);
      this.adminService.addCompany(this.customer).subscribe(
        (res) => {
          this.customer = res;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      JSON.stringify(this.customer);
      this.adminService.updateCompany(this.customer).subscribe(
        (res) => {
         this.customer = res;
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/customer');
  }
}
