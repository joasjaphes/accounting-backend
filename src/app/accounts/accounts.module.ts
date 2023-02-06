import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [TypeOrmModule.forFeature([AccountRepository])],
})
export class AccountsModule {}
