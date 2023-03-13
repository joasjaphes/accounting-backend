import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { AccountDto } from '../dtos/account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountsService) {}

  @Post('')
  async saveAccount(@Body() body: AccountDto) {
    return await this.accountService.saveAccount(body);
  }

  @Get('')
  async getAccounts() {
    return await this.accountService.getAllAccounts();
  }
  @Get('transactions/:id')
  async getAccountTransaction(@Param() params) {
    try {
      return await this.accountService.getAccountTransactions(params.id);
    } catch (e) {
      throw e;
    }
  }
}
