import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MatSidenavModule, MatButtonModule,
  MatToolbarModule, MatIconModule, MatListModule,
  MatCardModule, MatDialogModule, MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginComponent, LoginDialogComponent } from './login/login.component';
import { PasswordfilterPipe } from './passwordfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    CustomerPageComponent,
    ContactPageComponent,
    LoginComponent,
    LoginDialogComponent,
    PasswordfilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [LoginDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
