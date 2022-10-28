import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import IProduct from '../models/IProduct';
import { ShoppingCardService } from '../services/ShoppingCardService';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  public products: IProduct[] = [];
  public shoppingCartId: number = 0;
  public grandTotal: number = 0;
  public text: string = '';
  public fileUrl: any = null;
  public data: string = 'YOUR ORDER IS:';
  public totalPriceToData: string = 'THE TOTAL PRICE IS:';

  constructor(
    private shoppingCartService: ShoppingCardService,
    private sanitizer: DomSanitizer
  ) {}

  onDownloadClicked() {
    const blob = new Blob([this.data], {
      type: 'application/octet-stream',
    });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
    alert('Your order is being downloaded');
    
  }

  ngOnInit(): void {
    this.shoppingCartId = +localStorage.getItem('ShoppingCartID');
    this.shoppingCartService
      .getShoppingCart(this.shoppingCartId)
      .subscribe((res) => {
        this.products = res;
        this.products.map((p) => {
          this.data =
            this.data +
            p.name +
            ' ' +
            p.price +
            '$' +
            ' ' +
            'x' +
            ' ' +
            p.quantity +
            ' ';
        });
        this.grandTotal = +localStorage.getItem('totalPrice');
        this.totalPriceToData = this.totalPriceToData + this.grandTotal + '$';
        this.data = this.data + this.totalPriceToData;
      });
  }
}
