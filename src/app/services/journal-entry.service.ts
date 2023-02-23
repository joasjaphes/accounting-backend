import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntryDto } from 'src/app/dtos/journal-entry.dto';
import { JournalAccount } from 'src/app/entities/journal-account.entity';
import { JournalEntry } from 'src/app/entities/journal-entry.entity';
import { TransactionEntity } from 'src/app/entities/transaction.entity';
import { User } from 'src/app/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private repository: Repository<JournalEntry>,
  ) {}
  async saveJournalEntry(
    journalEntry: JournalEntryDto,
    transaction: TransactionEntity,
    journalAccounts: JournalAccount[],
    user: User,
  ) {
    try {
      const journal = new JournalEntry();
      journal.accounts = journalAccounts;
      journal.uid = journalEntry.id;
      journal.transaction = transaction;
      journal.user = user;
      const ref = await this.repository.findOne({ where: { uid: journal.id } });
      if (ref) {
        return await this.repository.update({ id: ref.id }, journal);
      }
      return await this.repository.save(journal);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
