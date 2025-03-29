import { Column, Entity, OneToMany } from 'typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Account extends CommonEntity {
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: false })
  category: string;
  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];
}
