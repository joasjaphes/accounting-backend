import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { Product } from '../product/product.entity';

@Entity()
export class InvoiceItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ unique: true, length: 11, nullable: false })
  uid: string;
  @Column({ nullable: false })
  amount: number;
  @Column({ nullable: false, default: 0 })
  VATAmount: number;
  @Column({ nullable: false, default: 0 })
  WHTAmount: number;
  @Column({ nullable: false })
  subtotal: number;
  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Invoice;
  @ManyToOne(() => Product, (product) => product.invoiceItems, { eager: true })
  product: Product;
  @Column({ nullable: false, default: 1 })
  quantity: number;
}
