export interface CurrencyDTO {
  id: string;
  name: string;
  description?: string;
  symbol: string;
  exchangeRate?: number;
  isDefaultLocalCurrency?: boolean;
  companyId: string;
}
