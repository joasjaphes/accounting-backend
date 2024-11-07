import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class PaymentType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  displayInSales: boolean;
  @Column()
  displayInDebtorsPayments: boolean;
  @Column()
  displayInCreditPayments?: boolean;
  @Column()
  displayInCustomerDeposits?: boolean;
  @Column()
  displayInRefunds?: boolean;
  @Column()
  displayInCashierReports?: boolean;
  @Column()
  displayInBankingReceivingMoney?: boolean;
  @ManyToOne(() => Company, (company) => company.paymentTypes)
  company: Company;
}
