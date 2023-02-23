import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionsService } from '../services/transactions.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
})
export class TransactionsModule {}
