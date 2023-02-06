import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { JournalEntry } from './journal-entry.entity';

@Entity({ name: 'transaction' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 11 })
  uid: string;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.transactions, { eager: true })
  user: User;

  @OneToOne(() => JournalEntry, (journal) => journal.transaction, {
    eager: false,
  })
  journalEntry;
}
