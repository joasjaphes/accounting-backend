import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
