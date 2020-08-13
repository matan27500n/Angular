import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedSquareComponent } from './components/red-square/red-square.component';
import { GreenSquareComponent } from './components/green-square/green-square.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    RedSquareComponent,
    GreenSquareComponent,
    AboutUsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
