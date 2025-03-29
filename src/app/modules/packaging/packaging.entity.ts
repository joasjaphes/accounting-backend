import { Entity, Column } from 'typeorm';
import { CommonEntity } from 'src/shared/common-entity';

@Entity()
export class Packaging extends CommonEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  pieces: number;
}
