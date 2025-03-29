import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Customer extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  email: string;
  @Column({ default: false })
  deleted: boolean;
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
