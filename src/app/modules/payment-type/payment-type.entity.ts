import { Column, Entity } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class PaymentType extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
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
}
