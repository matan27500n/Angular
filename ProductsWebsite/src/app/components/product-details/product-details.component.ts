import { ProductsService } from './../../services/products.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;

  public constructor(
    private activateRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  public ngOnInit(): void {
    this.productsService.getAllProductsAsync4().subscribe(
      (products) => {
        //the sign '+' make the id to number
        const id = +this.activateRoute.snapshot.params.id;
        this.product = products.find((p) => p.id === id);
      },
      (error) => {
        alert('Error: ' + error.message);
      }
    );
  }
}
