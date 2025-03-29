import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyUid } from '../../decorators/company.decorator';

@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async createAccount(
    @Body() account: AccountDTO,
    @CompanyUid() companyUid,
  ): Promise<AccountDTO> {
    return await this.accountService.createAccount(account, companyUid);
  }
  @Get()
  async getAllAccounts(@CompanyUid() companyUid): Promise<AccountDTO[]> {
    return await this.accountService.getAllAccounts(companyUid);
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
