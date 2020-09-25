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
  public customer = new Customer();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private customerDataService: CustomerDataService
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Customer');
      this.adminService.getOneCustomer(this.id).subscribe(
        (res) => {
          this.customer.id = res.id;
          this.customer.first_name = res.first_name;
          this.customer.last_name = res.last_name;
          this.customer.email = res.email;
          this.customer.password = res.password;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.title.setTitle('Adding Customer');
      this.type = 'Add';
    }
  }

  public addOrUpdateCustomer(): void {
    if (this.id === 0) {
      this.adminService.addCustomer(this.customer).subscribe(
        (res) => {
          this.customer === res;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.adminService.updateCustomer(this.customer).subscribe(
        (res) => {
          this.customer === res;
        },
        (err) => {
          alert('something wrong here');
        }
      );
    }
    this.route.navigateByUrl('/customer');
  }
}
