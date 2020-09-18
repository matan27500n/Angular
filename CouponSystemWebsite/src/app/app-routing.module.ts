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

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    //canActivate: [CompanyGuardService],
  },
  {
    path: 'customer',
    component: CustomerComponent,
    //canActivate: [CustomerGuardService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    //canActivate: [AdminGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '****', component: Page404Component },
  {
    path: 'company-add-and-update/:id',
    component: CompanyAddAndUpdateComponent,
  },
  {
    path: 'customer-add-and-update/:id',
    component: CustomerAddAndUpdateComponent,
  },
  { path: 'coupon-add-and-update:/id', component: CouponAddAndUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
