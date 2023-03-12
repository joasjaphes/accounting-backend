import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { JournalEntry } from './journal-entry.entity';
import { timingSafeEqual } from 'crypto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AccountTransaction } from './account-transaction.entity';

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

  @OneToOne(() => JournalEntry, { eager: false })
  journalEntry: JournalEntry;

  static async getTransaction(uid: string) {
    try {
      const transaction = await this.findOne({ uid });
      if (!transaction) {
        throw new NotFoundException();
      }
      return transaction;
    } catch (e) {
      console.error('Failed to fetch transaction', e);
      throw new BadRequestException();
    }
  }
}
