import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "src/app/model/product.model";
import { ProductRepository } from "src/app/model/product.repository";


@Component({
  templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
  editing: boolean = false;
  product: Product = new Product();

  constructor(private repository: ProductRepository,
    private router: Router, private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      Object.assign(this.product,
        repository.getProduct(activeRoute.snapshot.params["id"]));
    }
  }

  save() {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl("/admin/main/products");
  }

}