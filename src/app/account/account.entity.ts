import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';
import { TransactionEntity } from '../transactions/transaction.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 11, nullable: false })
  uid: string;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column()
  description: string;
  @Column({ nullable: false })
  category: string;
  @ManyToOne(() => Company, (company) => company.accounts)
  company: Company;
  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];
}
