import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Customer } from '../customer/customer.entity';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Invoice extends CommonEntity {
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
  invoiceNumber: string;
  @Column({ nullable: false })
  date: Date;
  @OneToMany(() => InvoiceItem, (item) => item.invoice, { eager: true })
  items: InvoiceItem[];
  @ManyToOne(() => Customer, (customer) => customer.invoices, { eager: true })
  customer: Customer;
}
