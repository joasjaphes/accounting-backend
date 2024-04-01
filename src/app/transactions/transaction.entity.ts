import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Company } from '../company/company.entity';
import { JournalEntry } from '../journal-entry/journal-entry.entity';
import { TransactionType } from './transaction.dto';
// import { TransactionType } from './transaction.dto';

@Entity()
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ unique: true, length: 11 })
  uid: string;
  @Column()
  amount: number;
  @Column()
  type: TransactionType;
  @Column()
  date: string;
  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;
  @ManyToOne(() => Company, (company) => company.transactions)
  company: Company;
  @ManyToOne(() => JournalEntry, (journal) => journal.transactions)
  journal: JournalEntry;
}
