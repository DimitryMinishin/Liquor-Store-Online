import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import IItemToDb from '../models/IItemToDb';
import IProduct from '../models/IProduct';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: IProduct[] = [];
  public productList = new BehaviorSubject<any>([]);
  public shoppingCartId: number = 0;
  public productToDb: any = {};

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }



  changeQuantity(product: any, count: number) {
    this.productToDb = {
      itemId: product.id,
      shoppingCardId: this.shoppingCartId,
      itemQuantity: count,
      itemPrice: product.price,
    };
    const observable = this.updateQuantity(this.productToDb);
    observable.subscribe(
      (successfulServerRequestData) => {
        this.productToDb = successfulServerRequestData;
        console.log(this.productToDb);
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
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        a.quantity = count;
      }
    });
    this.productList.next(this.cartItemList);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.shoppingCartId = +localStorage.getItem('ShoppingCartID');
    console.log(this.shoppingCartId);
    this.productToDb = {
      itemName: product.name,
      itemCategoryName: product.categoryName,
      itemId: product.id,
      shoppingCardId: this.shoppingCartId,
      itemQuantity: product.quantity,
      itemPrice: product.price,
    };
    console.log(this.productToDb);
    const observable = this.addItemToDb(this.productToDb);
    observable.subscribe(
      (successfulServerRequestData) => {
        this.productToDb = successfulServerRequestData;
        console.log(this.productToDb);
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
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    let quantityPrice = 0;
    this.cartItemList.map((a: any) => {
      quantityPrice = a.quantity * a.price;
      grandTotal += quantityPrice;
    });
    localStorage.setItem('totalPrice', JSON.stringify(grandTotal));
    return grandTotal;
  }

  removeCartItem(product: any) {
    const observable = this.removeItemFromDb(product);
    observable.subscribe(
      (successfulServerRequestData) => {
        this.productToDb = successfulServerRequestData;
        console.log(this.productToDb);
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
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  clearCartItemsList() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  removeAllCartItems(id: number) {
    const observable = this.removeAllItemsFromDb(id);
    observable.subscribe(
      (successfulServerRequestData) => {
        this.productToDb = successfulServerRequestData;
        console.log(this.productToDb);
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
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }



  addItemToDb(item: IItemToDb): Observable<any> {
    return this.http.post<any>('http://localhost:3001/items/add-item', item);
  }

  private listeners = new Subject<any>();
  listen(): Observable<any> {
    return this.listeners.asObservable();
  }
  filter(filterBy: string) {
    this.listeners.next(filterBy);
  }

  public removeItemFromDb(item: any): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3001/items/delete-item/${item.product_id}`
    );
  }

  public removeAllItemsFromDb(id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3001/items/delete-all-items/${id}`
    );
  }

  public updateQuantity(item: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3001/items/change-quantity`, item);
  }


}
