import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';
import { Company } from '../company/company.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ unique: true, nullable: false, length: 11 })
  uid: string;
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
  @ManyToOne(() => Company, (company) => company.customers)
  company: Company;
}
