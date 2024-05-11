import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JournalEntryService } from './journal-entry.service';
import { JournalEntryDTO } from './journal-entry.dto';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
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
  @Get()
  async getJournalEntries() {
    try {
      return await this.journalService.getJournalEntries();
    } catch (e) {
      throw e;
    }
  }
}
