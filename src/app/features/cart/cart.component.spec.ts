import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartComponent } from './cart.component';
import { TransactionStore } from '../../store/transaction.store';
import { signal } from '@angular/core';
import { Transaction } from '../../core/models/transaction.model';
import { ActivatedRoute } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartStore: jasmine.SpyObj<InstanceType<typeof TransactionStore>>;

  const testTransaction: Transaction = {
    id: 1,
    contractorName: 'Test Contractor',
    accountNumber: 'RBO1234567',
    amountPaid: 1000
  };

  beforeEach(async () => {
    const cartStoreSpy = jasmine.createSpyObj('TransactionStore', 
      ['loadTransactions', 'removeFromCart'],
      {
        transactions: signal([testTransaction]).asReadonly(),
        loading: signal(false).asReadonly(),
        cartIds: signal<number[]>([1]).asReadonly(),
        cartCount: signal(1).asReadonly(),
        cartTransactions: signal([testTransaction]).asReadonly(),
        cartTotal: signal(1000).asReadonly()
      }
    );

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: TransactionStore, useValue: cartStoreSpy },
        provideRouter([
          { path: '', component: CartComponent }
        ]),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    mockCartStore = TestBed.inject(TransactionStore) as jasmine.SpyObj<InstanceType<typeof TransactionStore>>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create component with empty cart store', () => {
    // Create a new mock with empty transactions
    const emptyCartStoreSpy = jasmine.createSpyObj('TransactionStore', 
      ['loadTransactions', 'removeFromCart'],
      {
        transactions: signal([]).asReadonly(),
        loading: signal(false).asReadonly(),
        cartIds: signal<number[]>([]).asReadonly(),
        cartCount: signal(0).asReadonly(),
        cartTransactions: signal([]).asReadonly(),
        cartTotal: signal(0).asReadonly()
      }
    );

    // Reset the call count
    emptyCartStoreSpy.loadTransactions.calls.reset();
    
    // Inject the empty store and create new component
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: TransactionStore, useValue: emptyCartStoreSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    });

    const emptyFixture = TestBed.createComponent(CartComponent);
    const emptyComponent = emptyFixture.componentInstance;
    
    expect(emptyComponent).toBeTruthy();
    expect(emptyComponent.cartStore.cartCount()).toBe(0);
  });

  it('should remove transaction from cart', () => {
    component.removeFromCart(testTransaction);
    expect(mockCartStore.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should track transactions by id', () => {
    const result = component.trackByTransactionId(0, testTransaction);
    expect(result).toBe(1);
  });

  it('should format currency correctly', () => {
    const result = component.formatCurrency(1500);
    expect(result).toBe('€ 1.500');
  });
});
