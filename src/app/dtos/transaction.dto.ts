export interface TransactionDto {
  id: string;
  date: string;
  description: string;
  status?: string;
  user?: string;
}
