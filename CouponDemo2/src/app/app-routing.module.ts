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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
