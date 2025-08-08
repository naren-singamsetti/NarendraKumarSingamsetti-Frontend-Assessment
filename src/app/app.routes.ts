import { Routes } from "@angular/router";
import { ROUTE_PATHS } from "./core/constants";

/**
 * Application Routes
 * Defines navigation paths for the transaction cart feature
 * Uses lazy loading for better initial load performance
 */
export const routes: Routes = [
  {
    path: ROUTE_PATHS.ROOT,
    loadComponent: () =>
      import("./features/transaction-list/transaction-list.component").then(
        (m) => m.TransactionListComponent
      ),
  },
  {
    path: ROUTE_PATHS.CART,
    loadComponent: () =>
      import("./features/cart/cart.component").then((m) => m.CartComponent),
  },
  { path: "**", redirectTo: ROUTE_PATHS.ROOT }, // Redirect invalid routes to home
];
