import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceItem } from '../invoice/invoice-item.entity';
import { Company } from '../company/company.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ unique: true, length: 11, nullable: false })
  uid: string;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  price: number;
  @OneToMany(() => InvoiceItem, (item) => item.product)
  invoiceItems: InvoiceItem[];
  @ManyToOne(() => Company, (company) => company.products)
  company: Company;
}
