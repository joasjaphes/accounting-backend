export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  imageUrl?: string;
  companyId?: string;
}
