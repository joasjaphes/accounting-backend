import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from '../controllers/accounts.controller';
import { AccountTransaction } from '../entities/account-transaction.entity';
import { Account } from '../entities/accounts.entity';
import { AccountsService } from '../services/accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [TypeOrmModule.forFeature([Account, AccountTransaction])],
  exports: [AccountsService],
})
export class AccountsModule {}
