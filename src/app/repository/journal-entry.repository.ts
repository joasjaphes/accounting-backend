import { EntityRepository, Repository } from 'typeorm';
import { JournalEntry } from '../entities/journal-entry.entity';

@EntityRepository(JournalEntry)
export class JournalEntryRepository extends Repository<JournalEntry> {
  async saveJournal(journalEntry: JournalEntry) {
    try {
      const ref = await this.findOne({ where: { uid: journalEntry.id } });
      if (ref) {
        return await this.update({ id: ref.id }, journalEntry);
      }
      return await this.save(journalEntry);
    } catch (e) {}
  }
}
