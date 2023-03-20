import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { Cart } from "../services/cart.service";
import { Order } from "../services/order.service";
import { OrderRepository } from "./order.repository";
import { RestDataSource } from "../services/rest.datasource.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    ProductRepository,
    {provide: StaticDataSource, useClass: RestDataSource},
    StaticDataSource,
    RestDataSource,
    Cart,
    Order,
    OrderRepository,
  ],
})
export class ModelModule { }