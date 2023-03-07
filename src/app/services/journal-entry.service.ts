import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntryDto } from 'src/app/dtos/journal-entry.dto';
import { JournalAccount } from 'src/app/entities/journal-account.entity';
import { JournalEntry } from 'src/app/entities/journal-entry.entity';
import { TransactionEntity } from 'src/app/entities/transaction.entity';
import { User } from 'src/app/entities/user.entity';
import { Repository } from 'typeorm';
import { JournalAccountDto } from '../dtos/journal-account.dto';
import { AccountsService } from './accounts.service';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private repository: Repository<JournalEntry>,
    private accountService: AccountsService,
    @InjectRepository(JournalAccount)
    private journalAccountRepository: Repository<JournalAccount>,
  ) {}
  async saveJournalEntry(
    journalEntry: JournalEntryDto,
    transaction: TransactionEntity,
    user: User,
  ) {
    console.log('journal', journalEntry);
    try {
      const journal = new JournalEntry();
      // journal.accounts = await this.savedJournalAccounts(journalEntry.accounts);
      journal.uid = journalEntry.id;
      journal.transaction = transaction;
      journal.user = user;
      const ref = await this.repository.findOne({
        where: { uid: `${journalEntry.id}` },
      });
      if (ref) {
        console.log('ref', ref);
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
        await this.journalAccountRepository.insert(accounts);
        await delete savedJournal?.id;
        return savedJournal;
      }
      // console.log('Journal', journal);
      // return 200;
      // await journal;
    } catch (e) {
      console.log('Erorr', e);
      throw new BadRequestException();
    }
  }

  async savedJournalAccounts(
    accounts: JournalAccountDto[],
    journal: JournalEntry,
  ) {
    const journalAccounts: JournalAccount[] = [];
    console.log('accounts', accounts);
    try {
      for (const account of accounts) {
        const savedAccount = new JournalAccount();
        savedAccount.credit = account.credit;
        savedAccount.debit = account.debit;
        const refAccount = await this.getAccount(account.id);
        savedAccount.account = refAccount;
        let newBalance = refAccount.balance
          ? parseFloat(refAccount.balance)
          : 0;
        if (savedAccount.credit) {
          newBalance -= parseFloat(savedAccount.credit);
        }
        if (savedAccount.debit) {
          newBalance += parseFloat(savedAccount.debit);
        }
        refAccount.balance = newBalance.toFixed(0);
        await refAccount.save();
        savedAccount.journal = journal;
        // await savedAccount.save();
        journalAccounts.push(savedAccount);
      }
      return journalAccounts;
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
