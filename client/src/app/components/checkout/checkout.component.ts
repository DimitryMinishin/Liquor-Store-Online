import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IProduct from '../models/IProduct';
import { CartService } from '../services/CartServise';
import { ShoppingCardService } from '../services/ShoppingCardService';
import { OrderService } from '../services/OrderService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  public shippingDetails: FormGroup;
  public creditCard: FormGroup;
  public orderDate: Date = new Date();
  public newOrder: any = {};
  public products: IProduct[] = [];
  public grandTotal = +localStorage.getItem('GrandTotal');
  public shoppingCartId = +localStorage.getItem('ShoppingCartID');

  constructor(
    private builder: FormBuilder,
    private shoppingCartService: ShoppingCardService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.shippingDetails = this.builder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.creditCard = this.builder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      cardHolder: ['', [Validators.required, Validators.minLength(2)]],
      securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      expirationDate: ['', [Validators.required, Validators.minLength(2)]],
      shippingDate: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.shoppingCartService
      .getShoppingCart(this.shoppingCartId)
      .subscribe((res) => {
        // console.log(res);
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }

  //get last 4 digits of card number
  getLastFourDigits(): string {
    return this.creditCard.get('cardNumber').value.slice(-4);
  }

  get firstName(): any {
    return this.shippingDetails.get('firstName');
  }
  get lastName(): any {
    return this.shippingDetails.get('lastName');
  }
  get address(): any {
    return this.shippingDetails.get('address');
  }
  get city(): any {
    return this.shippingDetails.get('city');
  }
  get state(): any {
    return this.shippingDetails.get('state');
  }
  get zipCode(): any {
    return this.shippingDetails.get('zipCode');
  }
  get phone(): any {
    return this.shippingDetails.get('phone');
  }
  get email(): any {
    return this.shippingDetails.get('email');
  }
  get cardNumber(): any {
    return this.creditCard.get('cardNumber');
  }
  get cardHolder(): any {
    return this.creditCard.get('cardHolder');
  }
  get securityCode(): any {
    return this.creditCard.get('securityCode');
  }
  get expirationDate(): any {
    return this.creditCard.get('expirationDate');
  }
  get shippingDate(): any {
    return this.creditCard.get('shippingDate');
  }

  onFinishClicked(): void {
    this.newOrder = {
      customerId: localStorage.getItem('CustomerID'),
      shoppingCartId: localStorage.getItem('ShoppingCartID'),
      firstName: this.shippingDetails.get('firstName').value,
      lastName: this.shippingDetails.get('lastName').value,
      address: this.shippingDetails.get('address').value,
      city: this.shippingDetails.get('city').value,
      state: this.shippingDetails.get('state').value,
      zipCode: this.shippingDetails.get('zipCode').value,
      phone: this.shippingDetails.get('phone').value,
      email: this.shippingDetails.get('email').value,
      fourDigits: this.getLastFourDigits(),
      orderDate: this.orderDate.toLocaleDateString(),
      finalPrice: this.grandTotal,
      shippingDate: this.creditCard
        .get('shippingDate')
        .value.toLocaleDateString(),
    };
    // console.log(this.newOrder);
    const observable = this.orderService.addOrder(this.newOrder);
    observable.subscribe((res) => {
      console.log(res);
alert('Your order has been placed successfully!');
      this.router.navigate(['/receipt']);
});
  }
}
