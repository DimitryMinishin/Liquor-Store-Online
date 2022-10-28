import { Pipe, PipeTransform } from '@angular/core';
import IProduct from 'src/app/components/models/IProduct';
import { ProductService } from '../services/ProductService';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  constructor(public productService: ProductService) {}

  public searchValue: string = '';

  transform(products: IProduct[], searchValue: string): IProduct[] {
    if (!products) {
      return [];
    }
    if (!searchValue) {
      return products;
    }
    searchValue = searchValue.toLowerCase();
    return products.filter((product) => {
      return product.name.toLowerCase().includes(searchValue);
    });
  }
}
