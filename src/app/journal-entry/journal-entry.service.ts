import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from './journal-entry.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { JournalEntryDTO } from './journal-entry.dto';
import { TransactionService } from '../transactions/transaction.service';
import { TransactionEntity } from '../transactions/transaction.entity';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private repository: Repository<JournalEntry>,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  async createJournalEntry(journal: JournalEntryDTO) {
    try {
      const journalPayload = await this.getJournalPayloadFromDTO(journal);
      return await journalPayload.save();
    } catch (e) {
      console.error('Failed to save journal entry', e);
      throw e;
    }
  }

  async getJournalEntries() {
    try {
      const journals = await this.repository.find();
      return journals.map((journal) =>
        this.getJournalEntryDTOFromPayload(journal)
      );
    } catch (e) {
      console.error('Failed to get journal entries', e);
      throw e;
    }
  }

  async getJournalPayloadFromDTO(journal: JournalEntryDTO) {
    const journalPayload = this.repository.create();
    journalPayload.uid = journal.id;
    journalPayload.date = journal.date;
    const transactions: TransactionEntity[] = [];
    for (const transaction of journal.transactions) {
      const transactionPayload =
        await this.transactionService.getTransactionPayloadFromDTO(transaction);
      transactions.push(transactionPayload);
    }
    journalPayload.transactions = transactions;
    return journalPayload;
  }

  getJournalEntryDTOFromPayload(journal: JournalEntry): JournalEntryDTO {
    return {
      id: journal.uid,
      date: journal.date,
      transactions: journal.transactions.map((transaction) =>
        this.transactionService.getTransactionDTOFromPayload(transaction)
      ),
    };
  }

  async getJournalEntryByUid(uid: string) {
    return await this.repository.findOne({ where: { uid } });
  }
}
