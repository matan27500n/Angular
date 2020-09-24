import { CompanyDateService } from './../../services/company-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-company-add-and-update',
  templateUrl: './company-add-and-update.component.html',
  styleUrls: ['./company-add-and-update.component.css'],
})
export class CompanyAddAndUpdateComponent implements OnInit {
  public type: string = 'Add';
  public id: number;
  public company = new Company();
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Company');
      this.adminService.getOneCompany(this.id).subscribe(
        (res) => {
          this.company.id = res.id;
          this.company.name = res.name;
          this.company.email = res.email;
          this.company.password = res.password;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.title.setTitle('Adding Company');
      this.type = 'Add';
    }
  }

  public addOrUpdateCompany(): void {
    if (this.id === 0) {
      this.adminService.addCompany(this.company).subscribe(
        (res) => {
          this.company === res;
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      this.adminService.updateCompany(this.company).subscribe(
        (res) => {
          this.company === res;
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/company');
  }
}
