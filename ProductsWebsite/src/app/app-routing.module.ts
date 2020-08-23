import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "products", component: ProductsComponent},
  {path: "product-details/:id", component: ProductDetailsComponent},
  {path: "add-product", component: AddProductComponent},
  {path: "about", component: AboutComponent},
  {path: "", redirectTo:"/home", pathMatch:"full"}, //this is to set default to the home page
  //this is for when path not accept by the address, so it will go to page 404 error
  {path:"**", component: Page404Component} 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
