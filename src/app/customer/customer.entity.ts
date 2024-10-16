import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
