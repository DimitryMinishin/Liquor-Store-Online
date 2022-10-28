import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { MainComponent } from '../main/main.component';
import { CategoriesComponent } from '../categories/categories.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { LogoutComponent } from '../logout/logout.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { AboutComponent } from '../about/about.component';


const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "categories", component: CategoriesComponent },
    { path: "main", component: MainComponent },
    { path: "signin", component: SignInComponent },
    { path: "login", component: LoginComponent },
    { path: "cart", component: ShoppingCardComponent },
    { path: "logout", component: LogoutComponent },
    { path: "checkout", component: CheckoutComponent },
    { path: "receipt", component: ReceiptComponent },
    { path: "about", component: AboutComponent },

    {path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ]
  })
export class RoutingModule {

 }
