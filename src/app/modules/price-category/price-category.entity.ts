import { CommonEntity } from 'src/shared/common-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PriceCategory extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  profitMargin: number;
  @Column()
  isDefault: boolean;
  @Column()
  status: string;
}
