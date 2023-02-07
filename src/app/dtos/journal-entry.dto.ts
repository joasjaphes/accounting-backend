export class JournalEntryDto {
  id: string;
  accounts: { id: string; credit: number; debit: number }[];
  transaction: { id: string };
}
