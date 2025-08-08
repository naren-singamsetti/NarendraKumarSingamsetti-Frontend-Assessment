import { computed } from "@angular/core";
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from "@ngrx/signals";
import { Transaction } from "../core/models/transaction.model";
import { DEFAULT_TRANSACTIONS } from "../core/constants";

interface CartState {
  transactions: Transaction[];
  cartIds: number[];
  loading: boolean;
}

export const TransactionStore = signalStore(
  { providedIn: "root" },

  // Initial state with pre-loaded transactions for better performance
  withState<CartState>({
    transactions: DEFAULT_TRANSACTIONS, // Pre-load for instant rendering
    cartIds: [],
    loading: false,
  }),

  // Computed signals (selectors)
  withComputed((store) => ({
    cartCount: computed(() => store.cartIds().length),
    cartTransactions: computed(() => {
      const ids = store.cartIds();
      return store
        .transactions()
        .filter((transaction: Transaction) => ids.includes(transaction.id));
    }),
    cartTotal: computed(() => {
      const ids = store.cartIds();
      const transactions = store
        .transactions()
        .filter((transaction: Transaction) => ids.includes(transaction.id));
      return transactions.reduce(
        (sum: number, transaction: Transaction) => sum + transaction.amountPaid,
        0
      );
    }),
  })),

  // Methods (actions)
  withMethods((store) => ({
    loadTransactions(): void {
      // Data is already pre-loaded in initial state for optimal performance
      // No-op method maintained for API compatibility
    },

    addToCart(transactionId: number): void {
      const transactions = store.transactions();
      const cartIds = store.cartIds();

      if (!transactions.some((t: Transaction) => t.id === transactionId)) {
        // Silent handling for better performance, only log in development
        if (typeof ngDevMode !== "undefined" && ngDevMode) {
          console.warn(`Transaction with ID ${transactionId} doesn't exist`);
        }
        return;
      }

      if (cartIds.includes(transactionId)) {
        // Silent handling for better UX, only log in development
        if (typeof ngDevMode !== "undefined" && ngDevMode) {
          console.warn(
            `Transaction with ID ${transactionId} is already in cart`
          );
        }
        return;
      }

      patchState(store, {
        cartIds: [...cartIds, transactionId],
      });
    },

    removeFromCart(transactionId: number): void {
      const cartIds = store.cartIds();

      if (!cartIds.includes(transactionId)) {
        // Silent handling for better performance, only log in development
        if (typeof ngDevMode !== "undefined" && ngDevMode) {
          console.warn(`Transaction ${transactionId} not found in cart`);
        }
        return;
      }

      patchState(store, {
        cartIds: cartIds.filter((id: number) => id !== transactionId),
      });
    },

    isInCart(transactionId: number): boolean {
      return store.cartIds().includes(transactionId);
    },

    clearCart(): void {
      patchState(store, { cartIds: [] });
    },

    getTransactionById(id: number): Transaction | undefined {
      return store.transactions().find((t: Transaction) => t.id === id);
    },

    // Test helper method - DO NOT USE IN PRODUCTION
    // Only for testing purposes to directly set transactions state
    setTransactionsForTesting(transactions: Transaction[]): void {
      patchState(store, { transactions });
    },
  }))
);
