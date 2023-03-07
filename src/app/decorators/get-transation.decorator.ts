import { createParamDecorator } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';

export const GetTransaction = createParamDecorator(
  async (data, req): Promise<TransactionEntity> => {
    const request = req?.args[0];
    const journalEntry = request?.body;
    return TransactionEntity.getTransaction(journalEntry?.transactionId);
  },
);
