import { TestBed } from "@angular/core/testing";
import { TransactionStore } from "./transaction.store";
import { Transaction } from "../core/models/transaction.model";

describe("TransactionStore", () => {
  let store: InstanceType<typeof TransactionStore>;

  const mockTransactions: Transaction[] = [
    {
      id: 1,
      contractorName: "John Doe",
      accountNumber: "RBO1234567",
      amountPaid: 1000,
    },
    {
      id: 2,
      contractorName: "Jane Smith",
      accountNumber: "RBO7654321",
      amountPaid: 2000,
    },
    {
      id: 3,
      contractorName: "Bob Johnson",
      accountNumber: "RBO9876543",
      amountPaid: 1500,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionStore],
    });

    store = TestBed.inject(TransactionStore);

    // Clear any existing state
    store.clearCart();
  });

  it("should be created", () => {
    expect(store).toBeTruthy();
  });

  describe("Initial State", () => {
    it("should have pre-loaded transactions and empty cart", () => {
      expect(store.transactions().length).toBeGreaterThan(0); // Pre-loaded transactions for performance
      expect(store.cartIds()).toEqual([]);
      expect(store.loading()).toBe(false);
      expect(store.cartCount()).toBe(0);
      expect(store.cartTotal()).toBe(0);
    });
  });

  describe("loadTransactions", () => {
    it("should be a no-op since transactions are pre-loaded", () => {
      const initialCount = store.transactions().length;
      const initialLoading = store.loading();

      store.loadTransactions();

      // Method should not change state since transactions are already loaded
      expect(store.loading()).toBe(initialLoading);
      expect(store.transactions().length).toBe(initialCount);
    });

    it("should maintain pre-loaded transactions", () => {
      expect(store.transactions().length).toBeGreaterThan(0);

      const firstTransaction = store.transactions()[0];
      expect(firstTransaction.id).toBeDefined();
      expect(firstTransaction.contractorName).toBeDefined();
      expect(firstTransaction.accountNumber).toBeDefined();
      expect(firstTransaction.amountPaid).toBeDefined();
    });
  });

  describe("Cart Operations with Test Data", () => {
    beforeEach(() => {
      // Set up test data for cart operations
      store.setTransactionsForTesting(mockTransactions);
      store.clearCart();
    });

    describe("addToCart", () => {
      it("should add transaction to cart", () => {
        store.addToCart(1);

        expect(store.cartIds()).toEqual([1]);
        expect(store.cartCount()).toBe(1);
        expect(store.isInCart(1)).toBe(true);
      });

      it("should add multiple transactions to cart", () => {
        store.addToCart(1);
        store.addToCart(2);

        expect(store.cartIds()).toEqual([1, 2]);
        expect(store.cartCount()).toBe(2);
        expect(store.isInCart(1)).toBe(true);
        expect(store.isInCart(2)).toBe(true);
      });

      it("should not add duplicate transaction to cart", () => {
        store.addToCart(1);
        store.addToCart(1);

        expect(store.cartIds()).toEqual([1]);
        expect(store.cartCount()).toBe(1);
      });

      it("should not add non-existent transaction to cart", () => {
        const consoleWarnSpy = spyOn(console, "warn");

        store.addToCart(999);

        expect(store.cartIds()).toEqual([]);
        expect(store.cartCount()).toBe(0);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "Transaction with ID 999 doesn't exist"
        );
      });

      it("should warn when adding duplicate transaction", () => {
        const consoleWarnSpy = spyOn(console, "warn");

        store.addToCart(1);
        store.addToCart(1);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "Transaction with ID 1 is already in cart"
        );
      });
    });

    describe("removeFromCart", () => {
      beforeEach(() => {
        // Add some items to cart for removal tests
        store.addToCart(1);
        store.addToCart(2);
        store.addToCart(3);
      });

      it("should remove transaction from cart", () => {
        store.removeFromCart(1);

        expect(store.cartIds()).toEqual([2, 3]);
        expect(store.cartCount()).toBe(2);
        expect(store.isInCart(1)).toBe(false);
        expect(store.isInCart(2)).toBe(true);
        expect(store.isInCart(3)).toBe(true);
      });

      it("should remove specific transaction without affecting others", () => {
        store.removeFromCart(2);

        expect(store.cartIds()).toEqual([1, 3]);
        expect(store.cartCount()).toBe(2);
        expect(store.isInCart(2)).toBe(false);
      });

      it("should warn when trying to remove non-existent item from cart", () => {
        const consoleWarnSpy = spyOn(console, "warn");

        store.removeFromCart(999);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "Transaction 999 not found in cart"
        );
        expect(store.cartIds()).toEqual([1, 2, 3]); // Cart should remain unchanged
      });
    });

    describe("clearCart", () => {
      it("should clear all items from cart", () => {
        store.addToCart(1);
        store.addToCart(2);
        store.addToCart(3);

        store.clearCart();

        expect(store.cartIds()).toEqual([]);
        expect(store.cartCount()).toBe(0);
      });

      it("should work when cart is already empty", () => {
        store.clearCart();

        expect(store.cartIds()).toEqual([]);
        expect(store.cartCount()).toBe(0);
      });
    });

    describe("isInCart", () => {
      beforeEach(() => {
        store.addToCart(1);
        store.addToCart(3);
      });

      it("should return true for items in cart", () => {
        expect(store.isInCart(1)).toBe(true);
        expect(store.isInCart(3)).toBe(true);
      });

      it("should return false for items not in cart", () => {
        expect(store.isInCart(2)).toBe(false);
        expect(store.isInCart(999)).toBe(false);
      });
    });

    describe("getTransactionById", () => {
      it("should return transaction by id", () => {
        const transaction = store.getTransactionById(1);

        expect(transaction).toEqual(mockTransactions[0]);
      });

      it("should return undefined for non-existent transaction", () => {
        const transaction = store.getTransactionById(999);

        expect(transaction).toBeUndefined();
      });
    });

    describe("Computed Properties", () => {
      describe("cartCount", () => {
        it("should return correct count when cart is empty", () => {
          expect(store.cartCount()).toBe(0);
        });

        it("should return correct count with items in cart", () => {
          store.addToCart(1);
          store.addToCart(2);

          expect(store.cartCount()).toBe(2);
        });
      });

      describe("cartTransactions", () => {
        it("should return empty array when cart is empty", () => {
          expect(store.cartTransactions()).toEqual([]);
        });

        it("should return transactions for items in cart", () => {
          store.addToCart(1);
          store.addToCart(3);

          const cartTransactions = store.cartTransactions();

          expect(cartTransactions.length).toBe(2);
          expect(cartTransactions).toContain(mockTransactions[0]);
          expect(cartTransactions).toContain(mockTransactions[2]);
          expect(cartTransactions).not.toContain(mockTransactions[1]);
        });

        it("should update when items are added or removed", () => {
          store.addToCart(1);
          expect(store.cartTransactions().length).toBe(1);

          store.addToCart(2);
          expect(store.cartTransactions().length).toBe(2);

          store.removeFromCart(1);
          expect(store.cartTransactions().length).toBe(1);
          expect(store.cartTransactions()[0]).toEqual(mockTransactions[1]);
        });
      });

      describe("cartTotal", () => {
        it("should return 0 when cart is empty", () => {
          expect(store.cartTotal()).toBe(0);
        });

        it("should calculate correct total for single item", () => {
          store.addToCart(1); // 1000

          expect(store.cartTotal()).toBe(1000);
        });

        it("should calculate correct total for multiple items", () => {
          store.addToCart(1); // 1000
          store.addToCart(2); // 2000
          store.addToCart(3); // 1500

          expect(store.cartTotal()).toBe(4500);
        });

        it("should update total when items are removed", () => {
          store.addToCart(1); // 1000
          store.addToCart(2); // 2000

          expect(store.cartTotal()).toBe(3000);

          store.removeFromCart(2); // Remove 2000

          expect(store.cartTotal()).toBe(1000);
        });

        it("should reset to 0 when cart is cleared", () => {
          store.addToCart(1);
          store.addToCart(2);

          expect(store.cartTotal()).toBe(3000);

          store.clearCart();

          expect(store.cartTotal()).toBe(0);
        });
      });
    });
  });

  describe("Test Helper Method", () => {
    it("should set transactions for testing", () => {
      const testTransactions: Transaction[] = [
        {
          id: 999,
          contractorName: "Test User",
          accountNumber: "TEST123",
          amountPaid: 500,
        },
      ];

      store.setTransactionsForTesting(testTransactions);

      expect(store.transactions()).toEqual(testTransactions);
    });
  });

  describe("Edge Cases", () => {
    beforeEach(() => {
      store.setTransactionsForTesting(mockTransactions);
    });

    it("should handle adding negative transaction ids gracefully", () => {
      const consoleWarnSpy = spyOn(console, "warn");

      store.addToCart(-1);
      store.addToCart(-999);

      expect(store.cartIds()).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    });

    it("should handle removing negative transaction ids gracefully", () => {
      const consoleWarnSpy = spyOn(console, "warn");

      store.removeFromCart(-1);
      store.removeFromCart(-999);

      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    });

    it("should handle isInCart with negative transaction ids", () => {
      expect(store.isInCart(-1)).toBe(false);
      expect(store.isInCart(-999)).toBe(false);
    });

    it("should handle getTransactionById with negative ids", () => {
      expect(store.getTransactionById(-1)).toBeUndefined();
      expect(store.getTransactionById(-999)).toBeUndefined();
    });

    it("should handle very large transaction ids", () => {
      const consoleWarnSpy = spyOn(console, "warn");

      store.addToCart(Number.MAX_SAFE_INTEGER);

      expect(store.cartIds()).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });
  });
});
