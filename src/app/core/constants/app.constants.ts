/**
 * Application-wide string constants
 * Contains all static text used throughout the application
 */

export const APP_TITLES = {
  MAIN: 'Transaction Cart',
  TRANSACTION_LIST: 'Transaction Cart',
  CART: 'Cart'
} as const;

export const NAVIGATION_LABELS = {
  TO_OVERVIEW: 'TO OVERVIEW',
  BROWSE_TRANSACTIONS: 'Browse Transactions'
} as const;

export const TABLE_HEADERS = {
  NAME: 'NAME',
  ACCOUNT_NUMBER: 'ACCOUNT NUMBER',
  AMOUNT: '€€€'
} as const;

export const EMPTY_CART_MESSAGES = {
  TITLE: 'Your cart is empty',
  SUBTITLE: 'Add some transactions to get started!'
} as const;

export const BUTTON_LABELS = {
  DELETE: 'DELETE',
  ADD: 'Add',
  ADDED: 'Added',
  CART: 'CART'
} as const;

export const FIELD_LABELS = {
  ACCOUNT: 'Account:',
  CONTRACTOR_NAME: 'Contractor name',
  ACCOUNT_NUMBER: 'Account number',
  AMOUNT_PAID: 'Amount Paid',
  TOTAL_PREFIX: 'TOTAL -'
} as const;

export const EMPTY_STATE_MESSAGES = {
  NO_TRANSACTIONS: 'No transactions found.'
} as const;

export const COMPONENT_SELECTORS = {
  APP_ROOT: 'app-root',
  TRANSACTION_LIST: 'app-transaction-list',
  CART: 'app-cart'
} as const;

export const ROUTE_PATHS = {
  ROOT: '',
  CART: 'cart'
} as const;

export const CSS_CLASSES = {
  BUTTON_BASE: 'btn-sm text-xs px-3 py-1',
  BUTTON_BASE_ROW: 'btn-sm',
  ADD_BUTTON: 'add-button',
  ADD_BUTTON_ADDED: 'add-button-added',
  DELETE_BUTTON: 'delete-button'
} as const;

export const ARIA_LABELS = {
  ADD_TO_CART: 'Add transaction to cart',
  DELETE_FROM_CART: 'Delete transaction from cart'
} as const;
