// Purpose: Account DTO (Data Transfer Object) interface.
export interface AccountDTO {
  id: string;
  name: string;
  description: string;
  category: string;
  parent?: string;
  code: string;
  level: number;
  company: string;
}
