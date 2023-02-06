import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private accountService: AccountsService) { }

    @Post('')
    async saveAccount(@Body() body: AccountDto) {
        return await this.accountService.saveAccount(body);
    }

    @Get('')
    async getAccounts() {
        return await this.accountService.getAllAccounts();
    }
}
