import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([TransactionRepository])],
})
export class TransactionsModule {}
