import { Injectable } from '@nestjs/common';
import { Account } from '../entities/accounts.entity';
import { AccountDto } from '../dtos/account.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async saveAccount(accountPayload: AccountDto) {
    try {
      const account = new Account();
      account.uid = accountPayload.id;
      account.balance = accountPayload.balance;
      account.initialBalance = accountPayload.initialBalance;
      account.category = accountPayload.category;
      account.name = accountPayload.name;
      account.description = accountPayload.description;
      account.status = accountPayload.status;
      const ref = await this.accountRepository.findOne({
        where: { uid: account.uid },
      });
      if (ref) {
        await this.accountRepository.update({ id: ref.id }, account);
      } else {
        await account.save();
      }
      return this.sanitizeAccount(account);
    } catch (e) {
      throw new Error();
    }
  }

  async getAllAccounts() {
    try {
      const accounts = await this.accountRepository.find();
      return accounts.map((account) => this.sanitizeAccount(account));
    } catch (e) {
      throw new Error();
    }
  }

  async getAccountById(id: string) {
    try {
      return await this.accountRepository.findOne({ where: { uid: id } });
    } catch (e) {
      throw e;
    }
  }

  sanitizeAccount(account: Account): AccountDto {
    return {
      id: account.uid,
      balance: account.balance ? account.balance : '0',
      initialBalance: account.initialBalance ? account.initialBalance : '0',
      category: account.category,
      name: account.name,
      description: account.description,
      status: account.status,
    };
  }
}
