import { ProductDTO } from '../product/product.dto';

export interface InvoiceItemDTO {
  id: string;
  amount: number;
  subtotal: number;
  VATAmount?: number;
  WHTAmount?: number;
  productId: string;
  product?: ProductDTO;
}
