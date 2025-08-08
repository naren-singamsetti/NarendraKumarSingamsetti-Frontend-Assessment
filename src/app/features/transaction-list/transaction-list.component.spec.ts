import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { TransactionListComponent } from "./transaction-list.component";
import { TransactionStore } from "../../store/transaction.store";
import { signal } from "@angular/core";
import { Transaction } from "../../core/models/transaction.model";
import { ActivatedRoute } from "@angular/router";

describe("TransactionListComponent", () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let mockCartStore: jasmine.SpyObj<InstanceType<typeof TransactionStore>>;

  const testTransaction: Transaction = {
    id: 1,
    contractorName: "Test Contractor",
    accountNumber: "RBO1234567",
    amountPaid: 1000,
  };

  beforeEach(async () => {
    const cartStoreSpy = jasmine.createSpyObj(
      "TransactionStore",
      ["loadTransactions", "addToCart", "isInCart"],
      {
        transactions: signal([testTransaction]).asReadonly(),
        loading: signal(false).asReadonly(),
        cartIds: signal<number[]>([]).asReadonly(),
        cartCount: signal(0).asReadonly(),
      }
    );

    await TestBed.configureTestingModule({
      imports: [TransactionListComponent],
      providers: [
        { provide: TransactionStore, useValue: cartStoreSpy },
        provideRouter([{ path: "", component: TransactionListComponent }]),
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    mockCartStore = TestBed.inject(TransactionStore) as jasmine.SpyObj<
      InstanceType<typeof TransactionStore>
    >;
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have access to transactions from store", () => {
    // Since transactions are pre-loaded in the store, component should have access to them
    expect(component.cartStore.transactions()).toBeDefined();
  });

  it("should add transaction to cart when not already in cart", () => {
    mockCartStore.isInCart.and.returnValue(false);

    component.addToCart(testTransaction);

    expect(mockCartStore.addToCart).toHaveBeenCalledWith(1);
  });

  it("should not add transaction to cart when already in cart", () => {
    mockCartStore.isInCart.and.returnValue(true);

    component.addToCart(testTransaction);

    expect(mockCartStore.addToCart).not.toHaveBeenCalled();
  });

  it("should return transaction id for trackByTransactionId", () => {
    const result = component.trackByTransactionId(0, testTransaction);
    expect(result).toBe(testTransaction.id);
  });
});
