import { CustomerDataService } from './../../services/customer-data.service';
import { AdminService } from './../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';

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
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private customerDataService: CustomerDataService
  ) {
    this.id = Number(activateRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Customer');
      this.customer.id = this.id;

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
      this.adminService.addCustomer(this.customer).subscribe(
        (res) => {
          alert('customer added');
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.adminService.updateCustomer(this.customer).subscribe(
        (res) => {
          alert('customer updated');
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/customer');
  }
}
