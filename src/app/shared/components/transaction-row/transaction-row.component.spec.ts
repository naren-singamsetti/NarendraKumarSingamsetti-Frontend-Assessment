import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionRowComponent } from "./transaction-row.component";
import { Transaction } from "../../../core/models/transaction.model";

describe("TransactionRowComponent", () => {
  let component: TransactionRowComponent;
  let fixture: ComponentFixture<TransactionRowComponent>;

  const testTransaction: Transaction = {
    id: 1,
    accountNumber: "RBO1234567890",
    contractorName: "Test Company",
    amountPaid: 1500,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRowComponent);
    component = fixture.componentInstance;
    component.transaction = testTransaction;
    component.actionType = "add";
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display transaction information correctly", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("Test Company");
    expect(compiled.textContent).toContain("€ 1.500");
    expect(compiled.textContent).toContain("RBO 1234567890");
  });

  it("should show ADD button for add action with normal state", () => {
    component.actionType = "add";
    component.buttonState = "normal";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button");
    expect(button?.textContent?.trim()).toBe("Add");
    expect(button?.disabled).toBe(false);
  });

  it("should show ADDED button for add action with added state", () => {
    component.actionType = "add";
    component.buttonState = "added";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button");
    expect(button?.textContent?.trim()).toBe("Added");
  });

  it("should show DELETE button for delete action", () => {
    component.actionType = "delete";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button");
    expect(button?.textContent?.trim()).toBe("DELETE");
  });

  it("should disable button when buttonState is disabled", () => {
    component.buttonState = "disabled";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button");
    expect(button?.disabled).toBe(true);
  });

  it("should emit actionClick when button is clicked and not disabled", () => {
    spyOn(component.actionClick, "emit");
    component.buttonState = "normal";

    component.onActionClick();

    expect(component.actionClick.emit).toHaveBeenCalledWith(testTransaction);
  });

  it("should not emit actionClick when button is disabled", () => {
    spyOn(component.actionClick, "emit");
    component.buttonState = "disabled";

    component.onActionClick();

    expect(component.actionClick.emit).not.toHaveBeenCalled();
  });

  it("should return correct aria label for add action", () => {
    component.actionType = "add";
    expect(component.getAriaLabel()).toBe("Add transaction to cart");
  });

  it("should return correct aria label for delete action", () => {
    component.actionType = "delete";
    expect(component.getAriaLabel()).toBe("Delete transaction from cart");
  });

  it("should return correct button classes for add action", () => {
    component.actionType = "add";
    expect(component.getButtonClasses()).toBe("btn-sm add-button");
  });

  it("should return correct button classes for delete action", () => {
    component.actionType = "delete";
    expect(component.getButtonClasses()).toBe("btn-sm delete-button");
  });
});
