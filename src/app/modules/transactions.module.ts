import { Module } from '@nestjs/common';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionRepository } from '../repository/transaction.repository';
import { TransactionsService } from '../services/transactions.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionsService, TransactionRepository],
  imports: [],
})
export class TransactionsModule {}
