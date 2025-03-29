import { Column, Entity, OneToMany } from 'typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class JournalEntry extends CommonEntity {
  @Column()
  date: string;
  @Column({ nullable: false })
  description: string;
  @OneToMany(() => TransactionEntity, (transaction) => transaction.journal, {
    eager: true,
  })
  transactions: TransactionEntity[];
}
