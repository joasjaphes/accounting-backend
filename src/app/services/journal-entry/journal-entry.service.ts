import { BadRequestException, Injectable } from '@nestjs/common';
import { JournalEntryDto } from 'src/app/dtos/journal-entry.dto';
import { JournalAccount } from 'src/app/entities/journal-account.entity';
import { JournalEntry } from 'src/app/entities/journal-entry.entity';
import { TransactionEntity } from 'src/app/entities/transaction.entity';
import { User } from 'src/app/entities/user.entity';
import { JournalEntryRepository } from 'src/app/repository/journal-entry.repository';

@Injectable()
export class JournalEntryService {
  constructor(private repository: JournalEntryRepository) {}
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
      await this.repository.saveJournal(journal);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
