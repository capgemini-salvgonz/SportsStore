import { Component, IterableDiffer, IterableDiffers } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Order } from "src/app/services/order.service";
import { OrderRepository } from "src/app/model/order.repository";

@Component({
  templateUrl: "orderTable.component.html"
})
export class OrderTableComponent {
  dataSource = new MatTableDataSource<Order>(this.repository.getOrders());
  differ: IterableDiffer<Order>;

  constructor(private repository: OrderRepository, differs: IterableDiffers) {
    this.differ = differs.find(this.repository.getOrders()).create();
    this.dataSource.filter = "true";
    this.dataSource.filterPredicate = (order, include) => {
      return !order.shipped || include.toString() == "true"
    };
  }

  get includeShipped(): boolean {
    return this.dataSource.filter == "true";
  }

  set includeShipped(include: boolean) {
    this.dataSource.filter = include.toString()
  }

  toggleShipped(order: Order) {
    order.shipped = !order.shipped;
    this.repository.updateOrder(order);
  }

  delete(id: number) {
    this.repository.deleteOrder(id);
  }

  ngDoCheck() {
    let changes = this.differ?.diff(this.repository.getOrders());
    if (changes != null) {
      this.dataSource.data = this.repository.getOrders();
    }
  }
  
}