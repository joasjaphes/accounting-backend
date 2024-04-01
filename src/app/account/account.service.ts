import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { AccountDTO } from './account.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
    private companyService: CompanyService
  ) {}

  async createAccount(account: AccountDTO): Promise<AccountDTO> {
    try {
      const accountPayload: Account = await this.getAccountPayloadFromDTO(
        account
      );
      const createdAccount: Account = await this.repository.save(
        accountPayload
      );
      return this.getAccountDTOFromPayload(createdAccount);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateAccount(account: AccountDTO): Promise<AccountDTO> {
    try {
      const accountPayload: Account = await this.getAccountPayloadFromDTO(
        account
      );
      const result = await this.repository.update(
        { uid: account.id },
        accountPayload
      );
      console.log(result);
      return account;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllAccounts(): Promise<AccountDTO[]> {
    try {
      const accounts: Account[] = await this.repository.find();
      return accounts.map((account) => this.getAccountDTOFromPayload(account));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAccountByUId(uid: string): Promise<AccountDTO> {
    try {
      const account: Account = await this.repository.findOne({
        where: { uid },
      });
      return this.getAccountDTOFromPayload(account);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  getAccountDTOFromPayload(account: Account): AccountDTO {
    return {
      id: account?.uid,
      name: account?.name,
      description: account?.description,
      category: account?.category,
      company: account?.company?.uid,
    };
  }

  async getAccountPayloadFromDTO(account: AccountDTO): Promise<Account> {
    const company = await this.companyService.getCompanyByUId(account.company);
    const companyPayload = await this.companyService.getCompanyPayloadFromDTO(
      company
    );
    const newAccount: Account = this.repository.create();
    newAccount.uid = account.id;
    newAccount.name = account.name;
    newAccount.description = account.description;
    newAccount.category = account.category;
    newAccount.company = companyPayload;
    return newAccount;
  }
}
