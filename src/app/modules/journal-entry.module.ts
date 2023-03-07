import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntryController } from '../controllers/journal-entry.controller';
import { JournalAccount } from '../entities/journal-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { AccountsService } from '../services/accounts.service';
import { JournalEntryService } from '../services/journal-entry.service';
import { AccountsModule } from './accounts.module';

@Module({
  controllers: [JournalEntryController],
  providers: [JournalEntryService],
  imports: [
    TypeOrmModule.forFeature([JournalEntry, JournalAccount]),
    AccountsModule,
  ],
})
export class JournalEntryModule {}
