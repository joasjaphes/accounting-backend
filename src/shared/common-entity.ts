import { Company } from 'src/app/modules/company/company.entity';
import { User } from 'src/app/modules/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  uid: string;
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
}
