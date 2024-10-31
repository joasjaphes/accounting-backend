import { CustomerDTO } from '../customer/customer.dto';
import { InvoiceItemDTO } from './invoice-item.dto';

export interface InvoiceDTO {
  id: string;
  description?: string;
  amount: number;
  discount?: number;
  subtotal?: number;
  VATAmount?: number;
  WHTAmount?: number;
  paymentStatus: string;
  items: InvoiceItemDTO[];
  date: Date;
  customerId: string;
  customer?: CustomerDTO;
  invoiceNumber: string;
}
