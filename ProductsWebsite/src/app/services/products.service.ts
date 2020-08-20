import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  public getAllProducts(): Product[]{
    const arr: Product[] = [];
    arr.push(new Product(1,"Apple",3.5,100));
    arr.push(new Product(1,"Banana",3.5,100));
    arr.push(new Product(1,"Peach",3.5,100));
    return arr;
  }
}
