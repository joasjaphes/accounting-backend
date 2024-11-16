import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class PriceCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  profitMargin: number;
  @Column()
  isDefault: boolean;
  @Column()
  status: string;
  @ManyToOne(() => Company, (company) => company.priceCategories)
  company: Company;
}
