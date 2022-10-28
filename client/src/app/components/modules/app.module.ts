import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { LoginComponent } from '../login/login.component';
import { RoutingModule } from './RoutingModule';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from '../../Interceptors/AuthenticationInterceptor';
import { SearchFilterPipe } from '../pipe/search-filter.pipe';
import { LayoutComponent } from '../layout/layout.component';
import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import {MatRadioModule} from '@angular/material/radio';
import { CategorySearchFilter } from '../pipe/category-search.pipe';
import { LogoutComponent } from '../logout/logout.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { NgxMaskModule } from 'ngx-mask';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import { ReceiptComponent } from '../receipt/receipt.component';
import { AboutComponent } from '../about/about.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupEditComponent } from '../popup-edit/popup-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // UserCardComponent,
    // CustomerComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DashboardComponent,
    HomeComponent,
    CategoriesComponent,
    SearchFilterPipe,
    ProductCardComponent,
    SignInComponent,
    ShoppingCardComponent,
    SearchFilterPipe,
    CategorySearchFilter,
    LogoutComponent,
    CheckoutComponent,
    ReceiptComponent,
    AboutComponent,
    PopupEditComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatBadgeModule,
    MatRadioModule,
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},  { provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }}],


bootstrap: [AppComponent]
})
export class AppModule { }
