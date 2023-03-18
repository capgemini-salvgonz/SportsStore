import { Component } from "@angular/core";
import { Cart } from "src/app/services/cart.service";
import { CartLine } from "src/app/model/cart.model";

@Component({
  templateUrl: 'cartDetail.component.html'
})
export class CartDetailComponent {

  constructor(public cart: Cart) {
  }

  get lines(): CartLine[] {
    return this.cart.lines;
  }

}