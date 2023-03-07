import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Transaction,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';
import { JournalEntry } from './journal-entry.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column()
  salt: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user, {
    eager: false,
  })
  transactions: TransactionEntity[];

  @OneToMany(() => JournalEntry, (entry) => entry.user, {
    eager: false,
  })
  journalEntries: JournalEntry[];

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    if (hash === this.password) {
      return true;
    } else {
      throw new UnauthorizedException('Wrong Password');
    }
  }

  static async authenticateUser(username: string, password: string) {
    const user = await this.findOne({ username });
    if (user) {
      return await user.validatePassword(password);
    } else {
      throw new UnauthorizedException('Wrong Username');
    }
  }

  static async getUser(username: string) {
    const user = await this.findOne({ username });
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
