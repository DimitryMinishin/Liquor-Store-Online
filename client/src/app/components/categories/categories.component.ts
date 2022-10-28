import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories = ['Cognac', 'Vodka', 'Wine', 'Rum', 'Whiskey'];

  constructor() { }

  ngOnInit(): void {
  }
onEnterClicked(number: number) {
    console.log(number);
  }
}
