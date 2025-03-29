export interface FinancialPeriodDTO {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  costingMethod: string;
  status: string;
  companyId?: string;
}
