import {
  Invoice,
  StripeBankAccount,
  Transaction,
} from "ffc-prisma-package/dist/client";

export interface Wallet {
  credits: number;
  euro: number;
}

export interface WithdrawRequest {
  amount: number;
}

export interface WithdrawResponse {
  transaction: Transaction;
  invoice: Invoice;
  withdraw: {
    feesPercentage: string;
    fees: number;
    amount: number;
    bank_account: StripeBankAccount;
  };
  session_uuid: string;
}
