import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { JournalAccount } from './journal-account.entity';
import { User } from './user.entity';

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ unique: true, length: 11 })
  uid: string;
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

  @ManyToOne(() => User, (user) => user.journalEntries, {
    eager: true,
  })
  user: User;
}
