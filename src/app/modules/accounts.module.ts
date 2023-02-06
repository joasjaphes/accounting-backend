import { Module } from '@nestjs/common';
import { AccountsController } from '../controllers/accounts.controller';
import { AccountRepository } from '../repository/accounts.repository';
import { AccountsService } from '../services/accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, AccountRepository],
  imports: [],
})
export class AccountsModule {}
