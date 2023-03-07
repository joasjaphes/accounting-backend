import { JournalAccountDto } from './journal-account.dto';

export class JournalEntryDto {
  id: string;
  accounts: JournalAccountDto[];
  transactionId: string;
}
