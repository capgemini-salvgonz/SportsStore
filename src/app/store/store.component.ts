import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../services/cart.service';


@Component({
  templateUrl: 'store.component.html',
})
export class StoreComponent {

  selectedCategory: string | undefined;
  productsPerPage: number = 4;
  selectedPage: number = 1;

  constructor(private repository: ProductRepository,
    private cart: Cart, private router: Router) {
  }

  get products(): Product[] {
    const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string): void {
    this.selectedPage = 1;
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newPageSize: number) {
    this.productsPerPage = newPageSize;
    this.changePage(1);
  }

  // get pageNumbers(): number[] {
  //   const pages = Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  //   return Array(pages).fill(0).map((value, index) => index + 1);
  // }

  get pageCount(): number {
    return Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productsPerPage)
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    // this.router.navigateByUrl('/cart');
  }

}