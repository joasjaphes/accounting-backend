import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';
import { TransactionDto } from '../dtos/transaction.dto';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionsService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async addTransaction(
    @Req() request,
    @Body() body: TransactionDto,
    @GetUser() user: User,
  ) {
    return await this.transactionService.createTransaction(body, user);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getAll() {
    return this.transactionService.getAllTransactions();
  }
}
