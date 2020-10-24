import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CompanyAddAndUpdateComponent } from './components/company-add-and-update/company-add-and-update.component';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyComponent } from './components/company/company.component';
import { CouponAddAndUpdateComponent } from './components/coupon-add-and-update/coupon-add-and-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddAndUpdateComponent } from './components/customer-add-and-update/customer-add-and-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { CustomerPurchaseComponent } from './components/customer-purchase/customer-purchase.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CouponsCategoryComponent } from './components/coupons-category/coupons-category.component';
import { CouponsMaxPriceComponent } from './components/coupons-max-price/coupons-max-price.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CompanyAddAndUpdateComponent,
    AdminComponent,
    CompanyComponent,
    CouponAddAndUpdateComponent,
    CustomerComponent,
    CustomerAddAndUpdateComponent,
    HomeComponent,
    LoginComponent,
    Page404Component,
    CompanyCouponsComponent,
    CustomerCouponsComponent,
    CustomerPurchaseComponent,
    CouponsCategoryComponent,
    CouponsMaxPriceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDividerModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
