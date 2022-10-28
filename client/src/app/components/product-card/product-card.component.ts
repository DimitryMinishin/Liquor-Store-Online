import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { subscribeOn } from 'rxjs';
import IProduct from '../models/IProduct';
import { PopupEditComponent } from '../popup-edit/popup-edit.component';
import { CartService } from '../services/CartServise';
import { ProductService } from '../services/ProductService';
import { SharedService } from '../services/SharedService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  public quantity: number = 0;
  public step: number = 1;
  public isLoggedIn: boolean = false;
  public customerType: string = localStorage.getItem('CustomerType');

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private userService: UserService,
    private productService: ProductService
  ) {}

  incrementClicked() {
    this.quantity += this.step;
  }

  decrementClicked() {
    if (this.quantity > 0) {
      this.quantity -= this.step;
    }
  }

  onAddToCardClicked(product: any) {
    this.cartService.addToCart(product);
  }

  onEditClicked() {
    this.dialog.open(PopupEditComponent, {
      data: this.product,
    });
  }

  onDeleteClicked() {
    this.productService.deleteProduct(this.product.id);
    const observable = this.productService.deleteProduct(this.product.id);
    observable.subscribe(() => {
      alert('Product deleted successfully');
      this.productService.filter('Register click');
    });
  }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(
      (message) => (this.isLoggedIn = message)
    );
    this.customerType = localStorage.getItem('CustomerType');
  }
}
