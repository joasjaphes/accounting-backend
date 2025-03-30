import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyUid } from '../../decorators/company.decorator';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async createAccount(
    @Request() req,
    @Body() account: AccountDTO,
    @CompanyUid() companyUid,
  ): Promise<AccountDTO> {
    return await this.accountService.createAccount(
      account,
      companyUid,
      req.currentUser,
    );
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
  async updateAccount(
    @Body() account: AccountDTO,
    @Request() request,
  ): Promise<AccountDTO> {
    return await this.accountService.updateAccount(
      account,
      request.currentUser,
    );
  }
}
