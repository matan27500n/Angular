import { Company } from './../models/company';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestCompanyApiService {

 public constructor(private httpClient: HttpClient) { }

 public getCompanies(): Observable<Company[]>{
    return this.httpClient.get<Company[]>('../../assets/json/company.json');
 }

}
