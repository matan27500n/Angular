import { CompanyAddandUpdateComponent } from './components/company-addand-update/company-addand-update.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { CustomerComponent } from '../app/components/customer/customer.component';
import { CompanyComponent } from '../app/components/company/company.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Routing - step 2
const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'coupon', component: CouponComponent },
  {
    path: 'company-addand-update/:id',
    component: CompanyAddandUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
