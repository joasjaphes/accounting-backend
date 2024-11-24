import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class Packaging extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  pieces: number;
  @ManyToOne(() => Company, (company) => company.packagings, { eager: true })
  company: Company;
  @Column()
  companyId: number;
}
