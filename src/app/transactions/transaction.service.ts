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
      console.error('Failed to save transaction entity', e);
      throw e;
    }
  }

  async getTransactionByUID(uid) {
    return this.repository.findOne({ where: { uid } });
  }

  async getTransactionPayloadFromDTO(
    transaction: TransactionDTO,
  ): Promise<TransactionEntity> {
    try {
      const transactionPayload = this.repository.create();
      transactionPayload.uid = transaction.id;
      transactionPayload.amount = transaction.amount;
      transactionPayload.type = transaction.type;
      transactionPayload.date = transaction.date;
      const account = await this.accountService.getOneAccount(
        transaction.accountId,
      );
      console.log('account', account);
      transactionPayload.account = account;
      return transactionPayload;
    } catch (e) {
      console.error('Failed to formulate transaction', e);
      throw e;
    }
  }

  getTransactionDTOFromPayload(transaction: TransactionEntity): TransactionDTO {
    console.log('transaction', transaction);
    return {
      id: transaction.uid,
      date: transaction.date,
      amount: transaction.amount,
      // journal: transaction.journal.uid,
      type: transaction.type,
      accountId: transaction.account.uid,
      // account: transaction.account,
    };
  }
}
