import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  balance: number;

  @Column({ unique: true, length: 11 })
  uid: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  description: string;
}
