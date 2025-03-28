import { Component } from '@angular/core';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent {
  // These are the values for the card
  userInput = { id: '', name: '', amount: null, pricePerItem: null };

  // This function is invoked when the user clicks on the add button
  onSubmitClick() {
    console.log(this.userInput);
  }
}
