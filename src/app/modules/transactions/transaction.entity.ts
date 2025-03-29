import { Column, Entity, ManyToOne } from 'typeorm';
import { Account } from '../account/account.entity';
import { JournalEntry } from '../journal-entry/journal-entry.entity';
import { TransactionType } from './transaction.dto';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class TransactionEntity extends CommonEntity {
  @Column()
  amount: number;
  @Column()
  type: TransactionType;
  @Column()
  date: string;
  @ManyToOne(() => Account, (account) => account.transactions, { eager: true })
  account: Account;
  @ManyToOne(() => JournalEntry, (journal) => journal.transactions)
  journal: JournalEntry;
}
