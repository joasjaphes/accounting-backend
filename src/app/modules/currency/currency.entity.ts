import { Column, Entity } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Currency extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  symbol: string;
  @Column({ nullable: true })
  exchangeRate: number;
  @Column({ default: false })
  isDefaultLocalCurrency?: boolean;
}
