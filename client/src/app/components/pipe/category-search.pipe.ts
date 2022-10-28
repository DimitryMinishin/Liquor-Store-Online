import { Pipe, PipeTransform } from '@angular/core';
import IProduct from 'src/app/components/models/IProduct';
import { ProductService } from '../services/ProductService';

@Pipe({
  name: 'categorySearchFilter',
})
export class CategorySearchFilter implements PipeTransform {
  constructor(public productService: ProductService) {}

  public selectedCategory: string = '';

  transform(products: IProduct[], selectedCategory: string): IProduct[] {
    if (!products) {
      return [];
    }
    if (selectedCategory == 'all') {
      return products;
    }
    if (!selectedCategory) {
      return products;
    }
    selectedCategory = selectedCategory.toLowerCase();
    return products.filter((product) => {
      return product.categoryName.toLowerCase().includes(selectedCategory);
    });
  }
}
