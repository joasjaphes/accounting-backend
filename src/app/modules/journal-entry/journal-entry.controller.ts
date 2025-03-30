import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JournalEntryService } from './journal-entry.service';
import { JournalEntryDTO } from './journal-entry.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyUid } from '../../decorators/company.decorator';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('journalEntries')
export class JournalEntryController {
  constructor(private journalService: JournalEntryService) {}
  @Post()
  async addJournalEntry(
    @Body() journal: JournalEntryDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.journalService.createJournalEntry(
        journal,
        request.currentUser,
        companyUid,
      );
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
