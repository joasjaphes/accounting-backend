import { Column, Entity, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Product } from '../product/product.entity';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class InvoiceItem extends CommonEntity {
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
