import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({

  providedIn: 'root',
})
export class ShoppingCardService {

constructor(private http: HttpClient) {}

  public createNewShoppingCart(shoppingCardDetails: any): Observable<any> {
    return this.http.post('http://localhost:3001/shopping-card', shoppingCardDetails);
  }

  public getShoppingCartByUserId(userId: any): Observable<any> {
    return this.http.get(`http://localhost:3001/shopping-card/${userId}`);
  }

  public isShoppingCartExist(userId: any): Observable<any> {
    return this.http.get(`http://localhost:3001/shopping-card/isShoppingCardExist/${userId}`);
  }

  public getShoppingCart(shoppingCartId: any): Observable<any> {
    return this.http.get(`http://localhost:3001/shopping-card/get-all-items/${shoppingCartId}`);
  }


}

