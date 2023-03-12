import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntryDto } from 'src/app/dtos/journal-entry.dto';
import { JournalEntry } from 'src/app/entities/journal-entry.entity';
import { TransactionEntity } from 'src/app/entities/transaction.entity';
import { User } from 'src/app/entities/user.entity';
import { Repository } from 'typeorm';
import { JournalAccountDto } from '../dtos/journal-account.dto';
import {
  AccountTransaction,
  TransactionAction,
} from '../entities/account-transaction.entity';
import { AccountsService } from './accounts.service';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private repository: Repository<JournalEntry>,
    private accountService: AccountsService,
    @InjectRepository(AccountTransaction)
    private accountTransactionRepository: Repository<AccountTransaction>,
  ) {}
  async saveJournalEntry(
    journalEntry: JournalEntryDto,
    transaction: TransactionEntity,
    user: User,
  ) {
    try {
      const journal = new JournalEntry();
      journal.uid = journalEntry.id;
      journal.transaction = transaction;
      journal.user = user;
      const ref = await this.repository.findOne({
        where: { uid: `${journalEntry.id}` },
      });
      if (ref) {
        return await this.repository.update({ id: ref.id }, journal);
      } else {
        await this.repository.insert(journal);
        const savedJournal = await this.repository.findOne({
          where: { uid: journal.uid },
        });
        const accounts = await this.savedJournalAccounts(
          journalEntry.accounts,
          savedJournal,
        );
        await this.accountTransactionRepository.insert(accounts);
        await delete savedJournal?.id;
        return savedJournal;
      }
    } catch (e) {
      console.log('Erorr', e);
      throw new BadRequestException();
    }
  }

  async savedJournalAccounts(
    accounts: JournalAccountDto[],
    journal: JournalEntry,
  ) {
    const accountTransactions: AccountTransaction[] = [];
    try {
      for (const account of accounts) {
        const transaction = new AccountTransaction();
        const refAccount = await this.getAccount(account.id);
        transaction.account = refAccount;
        transaction.journalEntry = journal;
        if (account.credit) {
          transaction.action = TransactionAction.CREDIT;
          transaction.amount = account.credit;
          transaction.account = refAccount;
          transaction.journalEntry = journal;
        }
        if (account.debit) {
          transaction.action = TransactionAction.DEBIT;
          transaction.amount = account.debit;
        }
        accountTransactions.push(transaction);
      }
      return accountTransactions;
    } catch (e) {
      console.log('error');
      throw e;
    }
  }

  async getAccount(accountId) {
    try {
      return this.accountService.getAccountById(accountId);
    } catch (e) {
      throw e;
    }
  }
}
