import { OrderPageComponent } from './Components/order-page/order-page.component';
import { AuthGuard } from './services/auth.guard';
import { AdminpageComponent } from './Components/adminpage/adminpage.component';
import { ContactPageComponent } from './Components/contact-page/contact-page.component';
import { CustomerPageComponent } from './Components/customer-page/customer-page.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { RoleGuard } from './services/role.guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerPageComponent },
  { path: 'order', component: OrderPageComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminpageComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
