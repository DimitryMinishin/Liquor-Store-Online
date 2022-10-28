import { Component, OnInit } from '@angular/core';
import IProduct from 'src/app/components/models/IProduct';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public products: IProduct[] = [];
  public searchValue: string;
  public selectedCategory: string;

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    }),
      this.productService.listen().subscribe((m: any) => {
        console.log(m);
        this.productService.getAllProducts().subscribe((products) => {
          this.products = products;
        });
      });

    (error) => {
      alert('Error! Status: ' + error.status + ', Message: ' + error.message);
    };
  }

  ngOnInit(): void {}
}
