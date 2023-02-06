import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { JournalAccount } from './journal-account.entity';

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @OneToOne(
    () => TransactionEntity,
    (transaction) => transaction.journalEntry,
    { eager: true },
  )
  transaction: TransactionEntity;
  @OneToMany(() => JournalAccount, (account) => account.journalId, {
    eager: true,
  })
  accounts: JournalAccount[];
}
