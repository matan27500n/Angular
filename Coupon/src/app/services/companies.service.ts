import { Company } from './../models/company';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  public constructor(private httpClient: HttpClient) {}

  public getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>('../../../assets/json/company.json', {
      withCredentials: true,
    });
  }
}
