import { Controller, Post, Req } from '@nestjs/common';
import { GetTransaction } from '../decorators/get-transation.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { JournalEntryService } from '../services/journal-entry.service';

@Controller('journal-entry')
export class JournalEntryController {
  constructor(private journalEntryService: JournalEntryService) {}
  @Post('')
  async saveJournalEntry(
    @Req() req,
    @GetUser() user,
    @GetTransaction() transaction,
  ) {
    try {
      const receivedTransaction = req.body;
      return await this.journalEntryService.saveJournalEntry(
        receivedTransaction,
        transaction,
        user,
      );
    } catch (e) {
      console.log('Error', e);
      throw e;
    }
  }
}
