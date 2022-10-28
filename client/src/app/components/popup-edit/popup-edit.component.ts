import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css'],
})
export class PopupEditComponent implements OnInit {
  public name: string = '';
  public description: string = '';
  public price: number = 0;
  public productId: number = 0;
  public productEditDetails: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.productId = data.id;
  }

  onEditClicked() {
    console.log(this.productEditDetails.value);
    this.productService
      .editProduct(this.productId, this.productEditDetails.value)
      .subscribe((data) => {
        this.router.navigate(['/main']);
        this.dialog.closeAll();
        this.productService.filter('Register click');
      });
  }

  onCloseClicked() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.productEditDetails = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      description: new FormControl(this.description, [Validators.required]),
      price: new FormControl(this.price, [Validators.required]),
    });
  }
}
