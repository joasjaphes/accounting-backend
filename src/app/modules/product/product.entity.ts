import { Column, Entity, OneToMany } from 'typeorm';
import { InvoiceItem } from '../invoice/invoice-item.entity';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Product extends CommonEntity {
  @Column({ unique: true, nullable: false })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  imageUrl: string;
  @OneToMany(() => InvoiceItem, (item) => item.product)
  invoiceItems: InvoiceItem[];
}
