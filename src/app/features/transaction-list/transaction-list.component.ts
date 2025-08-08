import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TransactionStore } from "../../store/transaction.store";
import { Transaction } from "../../core/models/transaction.model";
import {
  COMPONENT_SELECTORS,
  BUTTON_LABELS,
  FIELD_LABELS,
  APP_TITLES,
  EMPTY_STATE_MESSAGES,
} from "../../core/constants";
import {
  TransactionCardComponent,
  TransactionRowComponent,
} from "../../shared";

/**
 * Transaction List Component
 * Displays all available transactions and allows adding to cart
 */
@Component({
  selector: COMPONENT_SELECTORS.TRANSACTION_LIST,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TransactionCardComponent,
    TransactionRowComponent,
  ],
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {
  // Inject the cart store
  cartStore = inject(TransactionStore);

  // Labels and constants
  readonly buttonLabels = BUTTON_LABELS;
  readonly fieldLabels = FIELD_LABELS;
  readonly appTitles = APP_TITLES;
  readonly emptyStateMessages = EMPTY_STATE_MESSAGES;

  /**
   * TrackBy function for ngFor optimization
   * Helps Angular track items efficiently for better performance
   */
  trackByTransactionId(index: number, transaction: Transaction): number {
    return transaction.id;
  }

  /**
   * Add a transaction to the cart
   * Shows appropriate UI feedback and adds transaction to cart store
   * @param transaction - The transaction to add to the cart
   */
  addToCart(transaction: Transaction): void {
    if (!this.cartStore.isInCart(transaction.id)) {
      this.cartStore.addToCart(transaction.id);
    }
  }
}
