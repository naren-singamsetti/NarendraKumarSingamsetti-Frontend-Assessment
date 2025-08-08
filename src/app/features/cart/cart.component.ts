import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TransactionStore } from "../../store/transaction.store";
import { Transaction } from "../../core/models/transaction.model";
import {
  COMPONENT_SELECTORS,
  NAVIGATION_LABELS,
  TABLE_HEADERS,
  EMPTY_CART_MESSAGES,
  BUTTON_LABELS,
  FIELD_LABELS,
} from "../../core/constants";
import { formatCurrency } from "../../core/utils/number.utils";
import {
  TransactionCardComponent,
  TransactionRowComponent,
} from "../../shared";

/**
 * Cart Component
 * Displays all transactions in the cart, total amount and allows removal
 * Cart page of the application (route: '/cart')
 */
@Component({
  selector: COMPONENT_SELECTORS.CART,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TransactionCardComponent,
    TransactionRowComponent,
  ],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  // Inject the cart store
  cartStore = inject(TransactionStore);

  // Navigation labels
  readonly navigationLabels = NAVIGATION_LABELS;

  // Table headers
  readonly tableHeaders = TABLE_HEADERS;

  // Empty cart messages
  readonly emptyCartMessages = EMPTY_CART_MESSAGES;

  // Button labels
  readonly buttonLabels = BUTTON_LABELS;

  // Field labels
  readonly fieldLabels = FIELD_LABELS;

  /**
   * TrackBy function for ngFor optimization
   */
  trackByTransactionId(index: number, transaction: Transaction): number {
    return transaction.id;
  }

  /**
   * Remove a transaction from the cart
   * @param transaction - The transaction to remove from cart
   */
  removeFromCart(transaction: Transaction): void {
    this.cartStore.removeFromCart(transaction.id);
  }

  /**
   * Format currency using the utility function
   */
  formatCurrency(amount: number): string {
    return formatCurrency(amount);
  }
}
