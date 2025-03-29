import { Column, Entity } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class TaxCode extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  rate: number;
  @Column({ nullable: true })
  indicator: string;
  @Column({ nullable: true })
  EFDDepartmentCode: string;
  @Column()
  salesAccount: string;
  @Column()
  purchasesAccount: string;
}
