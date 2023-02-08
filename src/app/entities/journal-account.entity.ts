import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './accounts.entity';
import { JournalEntry } from './journal-entry.entity';

@Entity()
export class JournalAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ unique: true, length: 11 })
  uid: string;
  @Column()
  debit: number;
  @Column()
  credit: number;
  @ManyToOne(() => JournalEntry, (journal) => journal.accounts, {
    eager: false,
  })
  journalId;

  @ManyToOne(() => Account, (account) => account.journaAccounts, {
    eager: true,
  })
  account: Account;
}
