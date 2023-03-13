import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './accounts.entity';
import { JournalEntry } from './journal-entry.entity';
import { TransactionEntity } from './transaction.entity';

@Entity()
export class AccountTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false, length: 11 })
  uid: string;
  @Column()
  action: string;
  @Column()
  amount: string;
  @ManyToOne(() => Account, (account) => account.transactions, { eager: true })
  account: Account;
  @ManyToOne(() => JournalEntry, (journal) => journal.accountTransactions, {
    eager: false,
  })
  journalEntry: JournalEntry;
  @Column({ default: new Date() })
  date: string;
}

export enum TransactionAction {
  CREDIT = 'Credited',
  DEBIT = 'Debited',
}
