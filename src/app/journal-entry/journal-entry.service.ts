import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from './journal-entry.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { JournalEntryDTO } from './journal-entry.dto';
import { TransactionService } from '../transactions/transaction.service';
import { TransactionEntity } from '../transactions/transaction.entity';
import { TransactionDTO } from '../transactions/transaction.dto';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private repository: Repository<JournalEntry>,
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) {}

  async createJournalEntry(journal: JournalEntryDTO) {
    console.log('Journal', journal);
    try {
      await this.saveJournalTransactions(journal.transactions);
      const journalPayload = await this.getJournalPayloadFromDTO(journal);
      const entry = await journalPayload.save();
      return entry;
    } catch (e) {
      console.error('Failed to save journal entry', e);
      throw e;
    }
  }

  async saveJournalTransactions(transactions: TransactionDTO[]) {
    try {
      for (const transaction of transactions) {
        await this.transactionService.saveTransaction(transaction);
      }
    } catch (e) {
      console.error('Failed to save transactions', e);
      throw e;
    }
  }

  async getJournalEntries() {
    try {
      const journals = await this.repository.find();
      return journals.map((journal) =>
        this.getJournalEntryDTOFromPayload(journal),
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
    journalPayload.description = journal.description;
    const transactions: TransactionEntity[] = [];
    for (const transaction of journal.transactions) {
      const transactionPayload =
        await this.transactionService.getTransactionByUID(transaction.id);
      transactions.push(transactionPayload);
    }
    journalPayload.transactions = transactions;
    return journalPayload;
  }

  getJournalEntryDTOFromPayload(journal: JournalEntry): JournalEntryDTO {
    return {
      id: journal.uid,
      date: journal.date,
      description: journal.description,
      transactions: journal.transactions.map((transaction) =>
        this.transactionService.getTransactionDTOFromPayload(transaction),
      ),
    };
  }

  async getJournalEntryByUid(uid: string) {
    return await this.repository.findOne({ where: { uid } });
  }
}
