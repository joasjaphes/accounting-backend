import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true, length: 11 })
  uid: string;
  @Column()
  date: string;
  @OneToMany(() => TransactionEntity, (transaction) => transaction.journal)
  transactions: TransactionEntity[];
}
