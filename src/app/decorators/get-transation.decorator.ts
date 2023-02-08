import { createParamDecorator } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';

export const GetTransaction = createParamDecorator(
  async (data, req): Promise<TransactionEntity> => {
    console.log('data', data);
    return TransactionEntity.getTransaction(data);
  },
);
