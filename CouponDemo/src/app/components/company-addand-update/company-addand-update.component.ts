import { CompanyDataService } from './../../services/company-data.service';
import { Title } from '@angular/platform-browser';
import { RestCompanyApiService } from './../../services/rest-company-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-addand-update',
  templateUrl: './company-addand-update.component.html',
  styleUrls: ['./company-addand-update.component.css'],
})
export class CompanyAddandUpdateComponent implements OnInit {
  public type: string = 'Add';
  public id: number;
  public company = new Company();

  public constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private restCompanyApi: RestCompanyApiService,
    private route: Router,
    private companyDataService: CompanyDataService
  ) {
    this.id = Number(activatedRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.type = 'Update';
      this.title.setTitle('Updating Company');
      this.company.id = this.id;

      this.company = this.companyDataService
        .getCompanies()
        .filter(p => p.id === this.company.id)[0];
    } else {
      this.title.setTitle('Adding Company');
      this.type = 'Add';
    }
  }

  public addOrUpdateCompany(): void {
    if (this.id === 0) {
      //alert(JSON.stringify(this.company));
      this.restCompanyApi.addCompany(this.company).subscribe(
        (res) => {
          alert('product added');
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      //  alert(JSON.stringify(this.company));
      this.restCompanyApi.addCompany(this.company).subscribe(
        (res) => {
          alert('product updated');
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    this.route.navigateByUrl('/company');
  }
}
