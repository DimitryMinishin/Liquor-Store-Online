import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IProduct from '../models/IProduct';
import { CartService } from '../services/CartServise';
import { ShoppingCardService } from '../services/ShoppingCardService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css'],
})
export class ShoppingCardComponent implements OnInit, DoCheck {
  public products: IProduct[] = [];
  public totalPrice: number = 0;
  public grandTotal: number = 0;
  public customerId: number = 0;
  public step: number = 1;
  public shoppingCartId: number = 0;
  public itemsNumber: number = 0;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private shoppingCartService: ShoppingCardService,
    private router: Router
  ) {
    this.cartService.listen().subscribe((m: any) => {
      console.log(m);
      this.shoppingCartId = +localStorage.getItem('ShoppingCartID');
      if (this.shoppingCartId != 0) {
        this.shoppingCartService
          .getShoppingCart(this.shoppingCartId)
          .subscribe((res) => {
            this.products = res;
            this.grandTotal = this.cartService.getTotalPrice();
            this.itemsNumber = res.length;
            localStorage.setItem('ItemsNumber', this.itemsNumber.toString());
          });
      } else {
        this.cartService.getProducts().subscribe((res) => {
          this.products = res;
          this.grandTotal = this.cartService.getTotalPrice();
          this.itemsNumber = res.length;
          localStorage.setItem('ItemsNumber', this.itemsNumber.toString());
        });
      }
    });
  }

  ngDoCheck(): void {}

  ngOnInit(): void {
    this.userService.sharedcustomerId.subscribe((id) => (this.customerId = id));
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
      this.grandTotal = this.cartService.getTotalPrice();
    });
    this.shoppingCartId = +localStorage.getItem('ShoppingCartID');
    if (this.shoppingCartId != 0) {
      this.shoppingCartService
        .getShoppingCart(this.shoppingCartId)
        .subscribe((res) => {
          this.products = res;
          this.grandTotal = this.cartService.getTotalPrice();
          this.itemsNumber = res.length;
          localStorage.setItem('ItemsNumber', this.itemsNumber.toString());
        });
    }
  }

  onDeleteClicked(product: IProduct) {
    this.cartService.removeCartItem(product);
  }

  onCheckOutClicked() {
    this.router.navigate(['/checkout']);
  }

  incrementClicked(product: IProduct) {
    product.quantity += this.step;
    this.cartService.changeQuantity(product, product.quantity);
  }

  decrementClicked(product: IProduct) {
    if (product.quantity > 1) {
      product.quantity -= this.step;
      this.cartService.changeQuantity(product, product.quantity);
    }
  }

  onEmptyCartClicked() {
    this.cartService.removeAllCartItems(this.shoppingCartId);
  }
}
