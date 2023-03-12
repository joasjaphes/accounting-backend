import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { TransactionsModule } from './modules/transactions.module';
import { AccountsModule } from './modules/accounts.module';
import { JournalEntryService } from './services/journal-entry.service';
import { JournalEntryModule } from './modules/journal-entry.module';
import { User } from './entities/user.entity';
import { Account } from './entities/accounts.entity';
import { JournalAccount } from './entities/journal-account.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { AccountTransaction } from './entities/account-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'accounting',
      entities: [
        User,
        TransactionEntity,
        Account,
        JournalEntry,
        JournalAccount,
        AccountTransaction,
      ],
      // entities: [__dirname + '/../**/**/*.entity.{js,ts}'],
      synchronize: true,
      migrations: [__dirname + '/../migrations/*.{js,ts}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
    }),

    AuthModule,
    TransactionsModule,
    AccountsModule,
    JournalEntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
