import { Injectable } from "@angular/core";
import { Product } from "../model/product.model";
import { CartLine } from "../model/cart.model";


@Injectable()
export class Cart {

  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  addLine(product: Product, quantity: number = 1) {
    const line = this.lines.find(l => l.product.id == product.id);
    line ?
      line.quantity += quantity :
      this.lines.push(new CartLine(product, quantity));
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number) {
    const cartLine = this.lines.find(l => l.product.id === product.id);
    cartLine ? cartLine.quantity = quantity : undefined;
    this.recalculate();
  }

  removeLine(productId: number) {
    const indexOf = this.lines.findIndex((line) => line.product.id == productId);
    if (indexOf != -1) {
      this.lines.splice(indexOf, 1);
      this.recalculate();
    }
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;

    this.lines.forEach(line => {
        this.itemCount += line.quantity;
        this.cartPrice += line.lineTotal;
      });
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

}