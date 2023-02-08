import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { TransactionsModule } from './modules/transactions.module';
import { AccountsModule } from './modules/accounts.module';
import { JournalEntryService } from './services/journal-entry/journal-entry.service';
import { JournalEntryModule } from './modules/journal-entry.module';

@Module({
  imports: [
    AuthModule,
    TransactionsModule,
    AccountsModule,
    JournalEntryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'accounting',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      migrations: [__dirname + '/../migrations/*.{js,ts}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
