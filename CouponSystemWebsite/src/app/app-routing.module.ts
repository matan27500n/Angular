import { CouponsMaxPriceComponent } from './components/coupons-max-price/coupons-max-price.component';
import { CouponsCategoryComponent } from './components/coupons-category/coupons-category.component';
import { CustomerPurchaseComponent } from './components/customer-purchase/customer-purchase.component';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { CouponAddAndUpdateComponent } from './components/coupon-add-and-update/coupon-add-and-update.component';
import { CustomerAddAndUpdateComponent } from './components/customer-add-and-update/customer-add-and-update.component';
import { CompanyAddAndUpdateComponent } from './components/company-add-and-update/company-add-and-update.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerGuardService } from './services/customer-guard.service';
import { CustomerComponent } from './components/customer/customer.component';
import { CompanyGuardService } from './services/company-guard.service';
import { CompanyComponent } from './components/company/company.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [CompanyGuardService],
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [CustomerGuardService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },

  {
    path: 'company-add-and-update/:id',
    component: CompanyAddAndUpdateComponent,
  },
  {
    path: 'customer-add-and-update/:id',

    component: CustomerAddAndUpdateComponent,
  },
  { path: 'coupon-add-and-update/:id', component: CouponAddAndUpdateComponent },
  { path: 'company-coupons/:id', component: CompanyCouponsComponent },
  { path: 'customer-coupons/:id', component: CustomerCouponsComponent },
  { path: 'customer-purchase/:id', component: CustomerPurchaseComponent },
  { path: 'coupons-category/:categoryID', component: CouponsCategoryComponent },
  { path: 'coupons-max-price/:price', component: CouponsMaxPriceComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
