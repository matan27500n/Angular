import { ProductsService } from 'src/app/services/products.service';
import { Product } from './../../models/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  public product = new Product();

  public constructor(private productsService: ProductsService) {}

  public addProduct(): void {
    alert(`
    Name: ${this.product.name}
    Price: ${this.product.price}
    Stock: ${this.product.stock}
    `);

    // we cannot do this method now because we don't have a server!!
    // this.productsService.addProduct(this.product).subscribe(p => {
    //   alert("product has been successfully added!");
    // }, err => {
    //   alert("Error: " + err);
    //  });
    // }
  }
}
