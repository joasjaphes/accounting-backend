import { Injectable } from '@nestjs/common';
import { Account } from './accounts.entity';
import { AccountRepository } from './accounts.repository';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
    constructor(private accountRepository: AccountRepository) { }

    async saveAccount(accountPayload: AccountDto) {
        try {
            const account = new Account();
            account.uid = accountPayload.id;
            account.balance = accountPayload.balance;
            account.category = accountPayload.category;
            account.name = accountPayload.name;
            account.description = accountPayload.description;
            account.status = accountPayload.status;
            const accountResponse = await this.accountRepository.saveAccount(account);
            
            return this.sanitizeAccount(accountResponse);
        } catch (e) {
            throw new Error();
        }
    }

    async getAllAccounts() {
        try {
            const accounts = await this.accountRepository.getAllAccounts();
            return accounts.map(account => this.sanitizeAccount(account));
        } catch (e) {
            throw new Error();
        }
    }

    sanitizeAccount(account: Account): AccountDto {
        return {
            id: account.uid,
            balance: account.balance,
            category: account.category,
            name: account.name,
            description: account.description,
            status: account.status
        };
    }
}
