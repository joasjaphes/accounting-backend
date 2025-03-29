import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 11, unique: true, nullable: false })
  uid: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  address: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  TIN: string;
  @Column({ nullable: true })
  VRN: string;
  @Column({ nullable: true, default: 'OLD_COST' })
  costUpdateMethod: string;
  @Column({ nullable: true, default: false })
  forceAccounting: boolean;
  @Column({ nullable: true })
  logo: string;
  @Column({ nullable: true })
  efdSettings: string;
}
