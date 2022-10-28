import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/components/models/IUser';
import { UserService } from '../services/UserService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../services/SharedService';
import { ShoppingCardService } from '../services/ShoppingCardService';
import { formatDate } from '@angular/common';
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartServise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public userLoginDetails: FormGroup;
  public hide = true;
  public loginUser: IUser;
  public loginName: string = '';
  public serverResponse: any[] = [];
  public customerId: number = 0;
  public isLoggedIn: boolean = false;
  public customerType: string = '';
  public currentDate = new Date();
  public createdDate: string = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
  public newShoppingCart: any = {};
  public totalPrice: number = 0;

  constructor(
    private usersService: UserService,
    private sharedService: SharedService,
    private shoppingCardService: ShoppingCardService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}


  public onLoginClicked(): void {
    this.loginUser = {
      email: this.userLoginDetails.get('email').value,
      password: this.userLoginDetails.get('password').value,
    };

    const observable = this.usersService.login(this.loginUser);
    observable.subscribe(
      (successfulServerRequestData) => {
        this.serverResponse = Object.values(successfulServerRequestData);
        console.log(this.serverResponse);
        this.productService.filter('Register click');
        this.customerId = this.serverResponse[3];
        this.usersService.setSharedCustomerId(this.customerId);
        this.loginName = this.serverResponse[1];
        this.sharedService.nextMessage(this.loginName);
        this.usersService.setSharedIsLoggedIn(true);
        this.customerType = this.serverResponse[4];
        sessionStorage.setItem('token', successfulServerRequestData.token + '');
        localStorage.setItem('CustomerID', this.serverResponse[3]);
        localStorage.setItem('CustomerName', this.serverResponse[1]);
        localStorage.setItem('CustomerType', this.serverResponse[4]);
        this.router.navigate(['/main']);
        this.newShoppingCart = {
          customerId: this.customerId,
          createdDate: this.createdDate,
        };
        this.isShoppingCartExist();
      },
      (serverErrorResponse) => {
        alert(
          'Error! Status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse.message
        );
      }
    );
  }

  public isShoppingCartExist(): void {
    const observable = this.shoppingCardService.isShoppingCartExist(
      this.customerId
    );
    observable.subscribe(
      (successfulServerRequestData) => {
        this.serverResponse = Object.values(successfulServerRequestData);
        localStorage.setItem('ShoppingCartID', this.serverResponse[0]);
        this.cartService.getProducts();
        this.totalPrice = this.cartService.getTotalPrice();
        localStorage.setItem('TotalPrice', this.totalPrice.toString());
        
        // localStorage.setItem('TotalPrice', this.serverResponse[1]);
        if (this.serverResponse.length === 0) {
          this.createNewShoppingCart();
        }
      },
      (serverErrorResponse) => {
        alert(
          'Error! Status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse.message
        );
      }
    );
  }

  public createNewShoppingCart(): void {
    const observable = this.shoppingCardService.createNewShoppingCart(
      this.newShoppingCart
    );
    observable.subscribe((successfulServerRequestData) => {
      this.serverResponse = Object.values(successfulServerRequestData);
      localStorage.setItem('ShoppingCartID', this.serverResponse[1]);

      (serverErrorResponse) => {
        alert(
          'Error! Status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse.message
        );
      };
    });
  }

  ngOnInit() {
    this.sharedService.sharedMessage.subscribe(
      (message) => (this.loginName = message)
    );
    this.usersService.sharedcustomerId.subscribe(
      (customerId) => (this.customerId = customerId)
    );
    this.userLoginDetails = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
