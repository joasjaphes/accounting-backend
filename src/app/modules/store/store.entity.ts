import { Column, Entity } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Store extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  canRequestFromOtherStores: boolean;
  @Column()
  allowSales: boolean;
  @Column()
  canIssueToOtherStores?: boolean;
  @Column()
  canReceivePurchaseOrder?: boolean;
}
