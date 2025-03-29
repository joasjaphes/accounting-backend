import { CommonEntity } from 'src/shared/common-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class FinancialPeriod extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  costingMethod: string;
  @Column()
  status: string;
}
