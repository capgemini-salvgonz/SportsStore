import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
/**
 * Modules
 */
import { MaterialFeatures } from "./material.module";
/**
 * Components
 */
import { AdminComponent } from "./admin.component";
import { AuthComponent } from "./auth/auth.component";
import { OrderTableComponent } from "./components/orderTable/orderTable.component";
import { ProductEditorComponent } from "./components/productEditor/productEditor.component";
import { ProductTableComponent } from "./components/productTable/productTable.component";
/** 
 * Services
 */
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./auth/auth.guard";




let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  // { path: "main", component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: "main", component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: "products/:mode/:id", component: ProductEditorComponent },
      { path: "products/:mode", component: ProductEditorComponent },
      { path: "products", component: ProductTableComponent },
      { path: "orders", component: OrderTableComponent },
      { path: "**", redirectTo: "products" }
    ]
  },
  { path: "**", redirectTo: "auth" }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    MaterialFeatures,
  ],
  declarations: [
    AdminComponent,
    AuthComponent,
    OrderTableComponent,
    ProductEditorComponent,
    ProductTableComponent,
  ],
  providers: [AuthService, AuthGuard],
})
export class AdminModule { }