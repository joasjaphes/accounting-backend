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
  @Column({ type: 'bigint', nullable: true })
  debit: string;
  @Column({ type: 'bigint', nullable: true })
  credit: string;
  // @ManyToOne(() => JournalEntry, (journal) => journal.accounts, {
  //   eager: false,
  // })
  // journal: JournalEntry;
  // @ManyToOne(() => Account, (account) => account.journaAccounts, {
  //   eager: true,
  // })
  // account: Account;
}
