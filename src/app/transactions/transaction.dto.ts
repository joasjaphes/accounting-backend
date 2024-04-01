import { Account } from "../account/account.entity";

export interface TransactionDTO {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: string;
  journal?:string;
  account?:Account
}

export type TransactionType = 'Debit' | 'Credit';
