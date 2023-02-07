import { Module } from '@nestjs/common';
import { JournalEntryController } from '../controllers/journal-entry.controller';
import { JournalEntryRepository } from '../repository/journal-entry.repository';
import { JournalEntryService } from '../services/journal-entry/journal-entry.service';

@Module({
  controllers: [JournalEntryController],
  providers: [JournalEntryRepository, JournalEntryService],
  imports: [],
})
export class JournalEntryModule {}
