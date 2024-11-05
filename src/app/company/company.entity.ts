import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Account } from '../account/account.entity';
import { TransactionEntity } from '../transactions/transaction.entity';
import { Currency } from '../currency/currency.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 11, unique: true, nullable: false })
  uid: string;
  @Column({ nullable: false })
  name: string;
  @Column()
  description: string;
  @Column()
  address: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  TIN: string;
  @Column({ nullable: true })
  VRN: string;
  @Column({ nullable: true, default: 'OLD_COST' })
  costUpdateMethod: string;
  @Column({ nullable: true, default: false })
  forceAccounting: boolean;
  @Column({ nullable: true })
  logo: string;
  @Column({ nullable: true })
  efdSettings: string;
  @OneToMany(() => User, (user) => user.company)
  users: User[];
  @OneToMany(() => Account, (account) => account.company)
  accounts: Account[];
  @OneToMany(() => TransactionEntity, (transaction) => transaction.company)
  transactions: TransactionEntity[];
  @OneToMany(() => Currency, (currency) => currency.companyId)
  currencies: Currency[];
}
