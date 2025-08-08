/**
 * Interface representing a transaction in the system
 * This interface defines the structure of transaction data
 */
export interface Transaction {
  /** Unique identifier for the transaction */
  id: number;
  
  /** Name of the contractor involved in the transaction */
  contractorName: string;
  
  /** Bank account number */
  accountNumber: string;
  
  /** Amount paid in the transaction in EUR */
  amountPaid: number;
}
