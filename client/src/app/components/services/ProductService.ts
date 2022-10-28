import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IProduct from 'src/app/components/models/IProduct';
import { Subject } from 'rxjs';

@Injectable({
providedIn: 'root',
  })

  export class ProductService {
    constructor(private http: HttpClient) {}

    public getAllProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>('http://localhost:3001/products');
    }

    public editProduct(id: number, product: IProduct): Observable<IProduct> {
      return this.http.patch<IProduct>(`http://localhost:3001/products/edit/${id}`, product);
    }

//delete product
    public deleteProduct(id: number): Observable<IProduct> {
      return this.http.delete<any>(`http://localhost:3001/products/delete/${id}`);
    }

    private listeners = new Subject<any>();
    listen(): Observable<any> {
      return this.listeners.asObservable();
    }
    filter(filterBy: string) {
      this.listeners.next(filterBy);
    }
  }
