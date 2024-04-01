import { Body, Controller, Post } from '@nestjs/common';
import { JournalEntryService } from './journal-entry.service';
import { JournalEntryDTO } from './journal-entry.dto';

@Controller('journalEntries')
export class JournalEntryController {
  constructor(private journalService: JournalEntryService) {}
  @Post()
  async addJournalEntry(@Body() journal: JournalEntryDTO) {
    try {
      return await this.journalService.createJournalEntry(journal);
    } catch (e) {
      throw e;
    }
  }
}
