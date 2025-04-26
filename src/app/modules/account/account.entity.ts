import { Column, Entity, OneToOne } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Account extends CommonEntity {
  @Column({ nullable: false, unique: true, length: 50 })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ length: 3 })
  code: string;
  @Column({ nullable: false })
  level: number;
  @OneToOne(() => Account)
  parent: Account;
  @Column({ nullable: false })
  category: string;
}
