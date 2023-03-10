import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { TransactionDto } from '../dtos/transaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction(transactionPayload: TransactionDto, user: User) {
    try {
      const transaction = new TransactionEntity();
      transaction.uid = transactionPayload.id;
      transaction.date = transactionPayload.date;
      transaction.description = transactionPayload.description;
      transaction.status = transactionPayload.status;
      transaction.user = user;
      const ref = await this.transactionRepository.findOne({
        where: { uid: transactionPayload.id },
      });
      if (ref) {
        await this.transactionRepository.update({ id: ref.id }, transaction);
      } else {
        await transaction.save();
      }
      return this.sanitizePayload(transaction);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getAllTransactions() {
    const transactions = await this.transactionRepository.find();
    const transactionsToReturn = transactions.map((transaction) =>
      this.sanitizePayload(transaction),
    );
    return transactionsToReturn;
  }

  sanitizePayload(transaction: TransactionEntity) {
    return {
      id: transaction.uid,
      date: transaction.date,
      status: transaction.status,
      description: transaction.description,
      user: transaction.user.uid,
    };
  }
}
