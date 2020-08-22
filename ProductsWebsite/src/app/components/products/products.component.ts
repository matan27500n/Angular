import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from 'src/app/services/products.service';
import { from } from 'rxjs';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Product[];

  public constructor(
    private title: Title,
    private productsService: ProductsService
  ) {}

  public ngOnInit(): void {
    this.title.setTitle('Products site');

    //קריאה סינכרונית
    // this.products = this.productsService.getAllProducts();

    //קריאה אסינכרונית - טכניקה ראשונה
    // this.productsService.getAllProductsAsync(products => {
    //  this.products = products;
    //  }, error => {
    //   alert("Error: " + error.message);
    //  });

    //קריאה אסינכרונית - טכניקה שנייה
    // this.productsService.getAllProductsAsync2().then(products => {
    //  this.products = products;
    // }).catch(error => {
    //  alert("Error: " + error.message);
    // });

    //קריאה אסינכרונית - טכניקה שלישית
    //this.productsService.getAllProductsAsync3().subscribe(
    //  (products) => {
    //   this.products = products;
    //  },
    // (error) => {
    //   alert('Error: ' + error.message);
    // }
    // );
    //  }

    //הבאת המוצרים מהשרת
    this.productsService.getAllProductsAsync4().subscribe(
      (products) => {
        setTimeout(() => {
          this.products = products;
        }, 300);
      },
      (error) => {
        alert('Error: ' + error.message);
      }
    );
  }
}
