import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ nullable: false, length: 11, unique: true })
  uid: string;
  @Column()
  description: string;
  @Column({ nullable: false })
  amount: number;
  @Column({ nullable: false, default: 0 })
  VATAmount: number;
  @Column({ nullable: false, default: 0 })
  WHTAmount: number;
  @Column({ nullable: false })
  subtotal: number;
  @Column({ nullable: false, default: 'UNPAID' })
  paymentStatus: string;
  @Column({ nullable: false })
  date: Date;
  @OneToMany(() => InvoiceItem, (item) => item.invoice, { eager: true })
  items: InvoiceItem[];
  @ManyToOne(() => Customer, (customer) => customer.invoices, { eager: true })
  customer: Customer;
}
