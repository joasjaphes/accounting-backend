import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async createAccount(@Body() account: AccountDTO): Promise<AccountDTO> {
    return await this.accountService.createAccount(account);
  }
  @Get()
  async getAllAccounts(): Promise<AccountDTO[]> {
    return await this.accountService.getAllAccounts();
  }
  @Get(':uid')
  async getAccountByUId(uid: string): Promise<AccountDTO> {
    return await this.accountService.getAccountByUId(uid);
  }
  @Put()
  async updateAccount(@Body() account: AccountDTO): Promise<AccountDTO> {
    return await this.accountService.updateAccount(account);
  }
}
