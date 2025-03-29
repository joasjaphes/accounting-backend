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
export class TaxCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  rate: number;
  @Column({ nullable: true })
  indicator: string;
  @Column({ nullable: true })
  EFDDepartmentCode: string;
  @Column()
  salesAccount: string;
  @Column()
  purchasesAccount: string;
  @ManyToOne(() => Company, (company) => company.taxCodes)
  company: Company;
}
