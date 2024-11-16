import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class BinLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => Company, (company) => company.binLocations)
  company: Company;
}
