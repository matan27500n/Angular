import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Product[] {
    const arr: Product[] = [];
    arr.push(new Product(1, "Apple", 3.5, 100));
    arr.push(new Product(1, "Banana", 3.5, 100));
    arr.push(new Product(1, "Peach", 3.5, 100));
    return arr;
  }

  public getAllProductsAsync(successCallback, failureCallback): void {

    setTimeout(() => {
      try {
        const arr: Product[] = [];
        arr.push(new Product(1, "Apple", 3.5, 100));
        arr.push(new Product(1, "Banana", 3.5, 100));
        arr.push(new Product(1, "Peach", 3.5, 100));
        successCallback(arr);
      } catch (error) {
        failureCallback(error);
      }
    }, 3000);
  }

  //promise
  public getAllProductsAsync2(): Promise<Product[]>{

    return new Promise((resolve,reject) =>{
      setTimeout(() => {
        try {
          const arr: Product[] = [];
          arr.push(new Product(1, "Apple", 3.5, 100));
          arr.push(new Product(1, "Banana", 3.5, 100));
          arr.push(new Product(1, "Peach", 3.5, 100));
          resolve(arr);
        } catch (error) {
          reject(error);
        }
      }, 3000);
    
    });

  } 

  //observable
  public getAllProductsAsync3(): Observable<Product[]>{

    return Observable.create(observer => {
      setTimeout(() => {
        try {
          const arr: Product[] = [];
          arr.push(new Product(1, "Apple", 3.5, 100));
          arr.push(new Product(1, "Banana", 3.5, 100));
          arr.push(new Product(1, "Peach", 3.5, 100));
          observer.next(arr);//זה נותן לנו את הדיווח הבא
        } catch (error) {
          observer.error(error);//זה מדווח לנו את השגיאה
        }
      }, 3000);
    });
  } 

  public getAllProductsAsync4(): Observable<Product[]>{
    return this.httpClient.get<Product[]>("../../../assets/json/products.json", {withCredentials:true});
  }
}
