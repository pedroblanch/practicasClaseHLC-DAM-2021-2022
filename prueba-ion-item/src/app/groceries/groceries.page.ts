import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.page.html',
  styleUrls: ['./groceries.page.scss'],
})
export class GroceriesPage implements OnInit {

  groceries:string[] = [
    'Bread',
    'Milk',
    'Cheese',
    'Snacks',
    'Apples',
    'Bananas',
    'Peanut Butter',
    'Chocolate',
    'Avocada',
    'Vegemite',
    'Muffins',
    'Paper towels'
];

  constructor() { }

  ngOnInit() {
  }

}
