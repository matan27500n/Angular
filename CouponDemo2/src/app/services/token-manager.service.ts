import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  public constructor(private httpClient :HttpClient) { }

  public getToken():Observable<any>{
    return this.httpClient.get('');
  }
}
