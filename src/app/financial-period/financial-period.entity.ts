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
export class FinancialPeriod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  costingMethod: string;
  @Column()
  status: string;
  @ManyToOne(() => Company, (company) => company.financialPeriods)
  company: Company;
}
