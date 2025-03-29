export interface TaxCodeDTO {
  id: string;
  name: string;
  description?: string;
  rate: number;
  indicator?: string;
  EFDDepartmentCode?: string;
  salesAccount?: string;
  purchasesAccount?: string;
  companyId?: string;
}
