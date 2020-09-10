import { AddAndUpdateComponent } from './components/add-and-update/add-and-update.component';
import { Page404Component } from './components/page404/page404.component';
import { AdminGuardService } from './services/admin-guard.service';
import { CustomerGuardService } from './services/customer-guard.service';
import { CompanyGuardService } from './services/company-guard.service';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CompanyComponent } from './components/company/company.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

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
  { path: '****', component: Page404Component },
  {path:'add-and-update/:id', component: AddAndUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
