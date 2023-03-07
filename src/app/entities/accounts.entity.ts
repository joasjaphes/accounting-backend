import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JournalAccount } from './journal-account.entity';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column({ type: 'bigint', nullable: true })
  balance: string;

  @Column({ unique: true, length: 11 })
  uid: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @OneToMany(() => JournalAccount, (journalAccount) => journalAccount.account, {
    eager: false,
  })
  journaAccounts: JournalAccount[];
}
