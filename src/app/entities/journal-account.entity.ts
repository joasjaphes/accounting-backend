import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { JournalEntry } from './journal-entry.entity';

@Entity()
export class JournalAccount extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  accountId: string;
  @Column()
  debit: number;
  @Column()
  credit: number;
  @ManyToOne(() => JournalEntry, (journal) => journal.accounts, {
    eager: false,
  })
  journalId;
}
