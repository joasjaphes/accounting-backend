import { Column, Entity } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class BinLocation extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
}
