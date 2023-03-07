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

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ unique: true, length: 11 })
  uid: string;
  @OneToOne(() => TransactionEntity, { eager: true })
  @JoinColumn()
  transaction: TransactionEntity;

  @OneToMany(() => JournalAccount, (account) => account.journal, {
    eager: true,
  })
  accounts: JournalAccount[];

  @ManyToOne(() => User, (user) => user.journalEntries, {
    eager: false,
  })
  user: User;

  static async getJournalEntry(uid) {
    return await this.findOne({ uid });
  }
}
