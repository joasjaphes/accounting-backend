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
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 11 })
  uid: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  salesTax: string;
  @Column()
  purchasingTax: string;
  @Column()
  COGSAccount: string;
  @Column()
  inventoryAccount: string;
  @Column()
  salesAccount: string;
  @ManyToOne(() => Company, (company) => company.productCategories)
  company: Company;
}
