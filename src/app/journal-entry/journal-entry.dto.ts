import { TransactionDTO } from '../transactions/transaction.dto';

export interface JournalEntryDTO {
  id: string;
  date: string;
  transactions?: TransactionDTO[];
}
