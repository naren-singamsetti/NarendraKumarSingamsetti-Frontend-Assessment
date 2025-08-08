import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Transaction } from "../../../core/models/transaction.model";
import {
  BUTTON_LABELS,
  FIELD_LABELS,
  CSS_CLASSES,
  ARIA_LABELS,
} from "../../../core/constants";
import { formatAccountNumber } from "../../../core/utils/string.utils";
import { formatCurrency } from "../../../core/utils/number.utils";
import { ActionType, ButtonState } from "../../types/transaction.types";

@Component({
  selector: "app-transaction-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./transaction-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionCardComponent {
  @Input({ required: true }) transaction!: Transaction;
  @Input({ required: true }) actionType!: ActionType;
  @Input() buttonState: ButtonState = "normal";
  @Output() actionClick = new EventEmitter<Transaction>();

  readonly buttonLabels = BUTTON_LABELS;
  readonly fieldLabels = FIELD_LABELS;
  readonly cssClasses = CSS_CLASSES;
  readonly ariaLabels = ARIA_LABELS;

  formatCurrency = formatCurrency;
  formatAccountNumber = formatAccountNumber;

  onActionClick(): void {
    if (this.buttonState !== "disabled") {
      this.actionClick.emit(this.transaction);
    }
  }

  getButtonText(): string {
    if (this.actionType === "add") {
      return this.buttonState === "added"
        ? this.buttonLabels.ADDED
        : this.buttonLabels.ADD;
    }
    return this.buttonLabels.DELETE;
  }

  getButtonClasses(): string {
    const baseClasses = this.cssClasses.BUTTON_BASE;
    let actionClass: string;

    if (this.actionType === "add") {
      actionClass =
        this.buttonState === "added"
          ? this.cssClasses.ADD_BUTTON_ADDED
          : this.cssClasses.ADD_BUTTON;
    } else {
      actionClass = this.cssClasses.DELETE_BUTTON;
    }

    return `${baseClasses} ${actionClass}`;
  }

  getAriaLabel(): string {
    return this.actionType === "add"
      ? this.ariaLabels.ADD_TO_CART
      : this.ariaLabels.DELETE_FROM_CART;
  }
}
