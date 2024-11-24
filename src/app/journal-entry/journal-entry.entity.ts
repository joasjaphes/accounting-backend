import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';
import { Company } from '../company/company.entity';

@Entity()
export class JournalEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true, length: 11 })
  uid: string;
  @Column()
  date: string;
  @Column({ nullable: false })
  description: string;
  @OneToMany(() => TransactionEntity, (transaction) => transaction.journal, {
    eager: true,
  })
  transactions: TransactionEntity[];
  @ManyToOne(() => Company, (company) => company.journalEntries)
  company: Company;
}
