import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDTO } from './transaction.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
    private accountService: AccountService,
  ) {}

  async saveTransaction(transaction: TransactionDTO) {
    try {
      const payload = await this.getTransactionPayloadFromDTO(transaction);
      return payload.save();
    } catch (e) {
      console.error('Failed to save transaction', e);
      throw e;
    }
  }

  async getTransactionPayloadFromDTO(
    transaction: TransactionDTO
  ): Promise<TransactionEntity> {
    const transactionPayload = this.repository.create();
    transactionPayload.uid = transaction.id;
    transactionPayload.amount = transaction.amount;
    const account = await this.accountService.getAccountByUId(transaction.id);
    transactionPayload.account =
      await this.accountService.getAccountPayloadFromDTO(account);
    return transactionPayload;
  }

  getTransactionDTOFromPayload(transaction: TransactionEntity): TransactionDTO {
    return {
      id: transaction.uid,
      description: transaction.description,
      date: transaction.date,
      amount: transaction.amount,
      journal: transaction.journal.uid,
      type: transaction.type,
      account: transaction.account,
    };
  }
}
