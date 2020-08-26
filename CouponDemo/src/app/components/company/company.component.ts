import { CompanyService } from './../../services/company.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  public x: number;

  public constructor(
    private title: Title,
    private companyNumber: CompanyService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Company');
    this.companyNumber.updateNumber(22);
    this.x = this.companyNumber.getNumber();
  }
}
