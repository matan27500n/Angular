import { Company } from './../models/company';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestCompanyApiService {
  public constructor(private httpClient: HttpClient) {}

  public getOneCompany(id: number): Observable<Company>{
    return this.httpClient.get<Company>('../../assets/json/company.json');
  }

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
