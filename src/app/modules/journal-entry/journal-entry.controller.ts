import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JournalEntryService } from './journal-entry.service';
import { JournalEntryDTO } from './journal-entry.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyUid } from '../../decorators/company.decorator';

@UseGuards(AuthGuard)
@Controller('journalEntries')
export class JournalEntryController {
  constructor(private journalService: JournalEntryService) {}
  @Post()
  async addJournalEntry(
    @Body() journal: JournalEntryDTO,
    @CompanyUid() companyUid: string,
  ) {
    try {
      return await this.journalService.createJournalEntry(journal, companyUid);
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getJournalEntries(@CompanyUid() companyUid: string) {
    try {
      return await this.journalService.getJournalEntries(companyUid);
    } catch (e) {
      throw e;
    }
  }
}
