import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MatSidenavModule, MatButtonModule,
  MatToolbarModule, MatIconModule, MatListModule,
  MatCardModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatSelectModule,
  MatNativeDateModule
} from '@angular/material';

import { HomeComponent } from './Components/home/home.component';
import { MainNavComponent } from './Components/main-nav/main-nav.component';
import { CustomerPageComponent } from './Components/customer-page/customer-page.component';
import { ContactPageComponent } from './Components/contact-page/contact-page.component';
import { LoginComponent, LoginDialogComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

import { PasswordfilterPipe } from './passwordfilter.pipe';
import { AdminpageComponent } from './Components/adminpage/adminpage.component';

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
    RegisterComponent,
    AdminpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MaterialFileInputModule,
  ],
  entryComponents: [LoginDialogComponent],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
