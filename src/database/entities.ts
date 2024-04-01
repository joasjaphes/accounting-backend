import { Account } from 'src/app/account/account.entity';
import { Company } from 'src/app/company/company.entity';
import { JournalEntry } from 'src/app/journal-entry/journal-entry.entity';
import { TransactionEntity } from 'src/app/transactions/transaction.entity';
import { User } from 'src/app/user/user.entity';

export const entities = [
  Company,
  User,
  Account,
  TransactionEntity,
  JournalEntry,
];
