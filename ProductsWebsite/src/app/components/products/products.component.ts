import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService} from 'src/app/services/products.service';
import { from } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products : Product[];

 public constructor(private title: Title,private productsService: ProductsService) { }

  public ngOnInit(): void {
    this.title.setTitle("Products site");
    this.products = this.productsService.getAllProducts();
    console.log(this.products);
  }

}
