export class JournalEntryDto {
  id: string;
  accounts: { id: string; credit: number; debit: number }[];
  transactionId: string;
}
