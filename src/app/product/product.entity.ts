import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceItem } from '../invoice/invoice-item.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ unique: true, length: 11, nullable: false })
  uid: string;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  price: number;
  @OneToMany(() => InvoiceItem, (item) => item.product)
  invoiceItems: InvoiceItem[];
}
