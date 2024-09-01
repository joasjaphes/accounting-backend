import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 11, nullable: false })
  uid: string;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  price: number;
}
