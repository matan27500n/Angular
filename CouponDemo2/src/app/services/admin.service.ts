import { Company } from './../models/company';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(
    private httpClient: HttpClient,
    private urlService: UrlService
  ) {}

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>('../../assets/json/company.json');
  }

  public deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete<any>('../../assets/json/company.json');
  }

  public addCompany(company: Company): Observable<any> {
    return this.httpClient.post<any>('../../assets/json/company.json', company);
  }

  public updateCompany(company: Company): Observable<any> {
    return this.httpClient.put<any>('../../assets/json/company.json', company);
  }
  
}
