export interface CompanyDTO {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  TIN?: string;
  VRN?: string;
  costUpdateMethod?: string;
  forceAccounting?: boolean;
  logo?: string;
  efdSettings?: string;
}
