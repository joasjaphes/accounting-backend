import { Column, Entity } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class ProductCategory extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  salesTax: string;
  @Column()
  purchasingTax: string;
  @Column()
  COGSAccount: string;
  @Column()
  inventoryAccount: string;
  @Column()
  salesAccount: string;
}
