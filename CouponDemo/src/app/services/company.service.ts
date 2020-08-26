import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public num: number;

 public constructor() { }

 public updateNumber(num:number):void{
   this.num=num;
 }

 public getNumber(): number{
   return this.num;
 }
}
