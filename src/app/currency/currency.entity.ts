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
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  symbol: string;
  @Column()
  exchangeRate: number;
  @Column()
  isDefaultLocalCurrency?: boolean;
  @ManyToOne(() => Company, (company) => company.currencies)
  companyId: string;
}
