import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false, length: 11 })
  uid: string;
  @Column({ nullable: false, length: 50 })
  firstName: string;
  @Column({ nullable: false, length: 50 })
  surname: string;
  @Column({ nullable: false, length: 50 })
  email: string;
  @Column({ nullable: false, length: 50, unique: true })
  phoneNumber: string;
  @Column({ nullable: false, length: 50 })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  salt: string;
  @Column({ nullable: false, length: 50 })
  role: string;
  @ManyToOne(() => User)
  createdBy: User;
  @ManyToOne(() => User)
  updatedBy: User;
  @ManyToOne(() => Company)
  company: Company;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    if (hash === this.password) {
      return true;
    } else {
      return false;
    }
  }
}
