import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Account extends CommonEntity {
  @Column({ nullable: false, unique: true, length: 50 })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: false })
  level: number;
  @ManyToOne(() => Account)
  @JoinColumn()
  parent: Account;
  @Column()
  category: string;
}
