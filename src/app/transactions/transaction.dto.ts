import { Account } from '../account/account.entity';

export interface TransactionDTO {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  journal?: string;
  accountId: string;
  account?: Account;
}

export type TransactionType = 'DEBIT' | 'CREDIT';
