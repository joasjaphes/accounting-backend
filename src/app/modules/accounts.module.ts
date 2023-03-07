import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from '../controllers/accounts.controller';
import { Account } from '../entities/accounts.entity';
import { AccountsService } from '../services/accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [TypeOrmModule.forFeature([Account])],
  exports: [AccountsService],
})
export class AccountsModule {}
