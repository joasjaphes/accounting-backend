import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntryController } from '../controllers/journal-entry.controller';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryService } from '../services/journal-entry.service';

@Module({
  controllers: [JournalEntryController],
  providers: [JournalEntryService],
  imports: [TypeOrmModule.forFeature([JournalEntry])],
})
export class JournalEntryModule {}
