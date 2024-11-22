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
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  canRequestFromOtherStores: boolean;
  @Column()
  allowSales: boolean;
  @Column()
  canIssueToOtherStores?: boolean;
  @Column()
  canReceivePurchaseOrder?: boolean;
  @ManyToOne(() => Company, (company) => company.stores)
  company: Company;
}
