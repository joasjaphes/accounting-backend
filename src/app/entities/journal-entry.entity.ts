import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { JournalAccount } from './journal-account.entity';
import { User } from './user.entity';
import { AccountTransaction } from './account-transaction.entity';

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ unique: true, length: 11 })
  uid: string;
  @OneToOne(() => TransactionEntity, { eager: false })
  @JoinColumn()
  transaction: TransactionEntity;

  @OneToMany(
    () => AccountTransaction,
    (accountTransaction) => accountTransaction.journalEntry,
    { eager: true },
  )
  accountTransactions: AccountTransaction[];

  // @OneToMany(() => JournalAccount, (account) => account.journal, {
  //   eager: true,
  // })
  // accounts: JournalAccount[];

  @ManyToOne(() => User, (user) => user.journalEntries, {
    eager: false,
  })
  user: User;

  static async getJournalEntry(uid) {
    return await this.findOne({ uid });
  }
}
