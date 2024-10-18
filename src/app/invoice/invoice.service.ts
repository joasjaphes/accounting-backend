import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { ProductService } from '../product/product.service';
import { InvoiceDTO } from './invoice.dto';
import { InvoiceItemDTO } from './invoice-item.dto';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
    private productService: ProductService,
    private customerService: CustomerService,
  ) {}

  async createInvoice(invoicePaylad: InvoiceDTO) {
    try {
      const invoice = this.getInvoicePayloadFromDTO(invoicePaylad);
      invoice.customer = await this.customerService.findCustomerByUID(
        invoicePaylad.customerId,
      );
      const savedInvoice = await this.invoiceRepository.save([invoice]);
      await this.saveInvoiceItems(invoicePaylad, invoice);
      return savedInvoice;
    } catch (e) {
      console.error('Failed saving invoice', e);
      throw e;
    }
  }

  async getInvoices() {
    try {
      const invoices = await this.invoiceRepository.find();
      return invoices.map((invoice) => this.getInvoiceDTO(invoice));
    } catch (e) {
      throw e;
    }
  }

  getInvoicePayloadFromDTO(invoiceDto: InvoiceDTO) {
    const invoice = new Invoice();
    invoice.uid = invoiceDto.id;
    invoice.amount = invoiceDto.amount;
    invoice.date = invoiceDto.date;
    invoice.description = invoiceDto.description;
    invoice.subtotal = invoiceDto.subtotal;
    invoice.paymentStatus = invoiceDto.paymentStatus;
    invoice.VATAmount = invoiceDto.VATAmount;
    invoice.WHTAmount = invoiceDto.WHTAmount;
    return invoice;
  }

  async saveInvoiceItems(invoicePayload: InvoiceDTO, invoice: Invoice) {
    try {
      const invoiceItems: InvoiceItemDTO[] = invoicePayload.items;
      const items: InvoiceItem[] = [];
      for (const item of invoiceItems) {
        const itemPayload = await this.getInvoiceItemFromItemDTO(item);
        itemPayload.invoice = invoice;
        items.push(itemPayload);
      }
      await this.invoiceItemRepository.save(items);
    } catch (e) {
      console.error('Failed to save invoice items', e);
      throw e;
    }
  }

  async getInvoiceItemFromItemDTO(itemDto: InvoiceItemDTO) {
    try {
      const invoiceItem = new InvoiceItem();
      invoiceItem.uid = itemDto.id;
      invoiceItem.VATAmount = itemDto.VATAmount;
      invoiceItem.WHTAmount = itemDto.WHTAmount;
      invoiceItem.amount = itemDto.amount;
      invoiceItem.subtotal = itemDto.subtotal;
      const product = await this.productService.findProductByUid(
        itemDto.productId,
      );
      invoiceItem.product = product;
      return invoiceItem;
    } catch (e) {
      console.error('Failed to generate invoice item', e);
      throw e;
    }
  }

  getInvoiceDTO(invoice: Invoice): InvoiceDTO {
    return {
      id: invoice.uid,
      amount: invoice.amount,
      date: invoice.date,
      description: invoice.description,
      VATAmount: invoice.VATAmount,
      WHTAmount: invoice.WHTAmount,
      subtotal: invoice.subtotal,
      paymentStatus: invoice.paymentStatus,
      customerId: invoice.customer.uid,
      customer: this.customerService.getCustomerDTO(invoice.customer),
      items: invoice.items.map((item) => this.getInvoiceItemDTO(item)),
    };
  }

  getInvoiceItemDTO(invoiceItem: InvoiceItem): InvoiceItemDTO {
    return {
      id: invoiceItem.uid,
      amount: invoiceItem.amount,
      subtotal: invoiceItem.subtotal,
      productId: invoiceItem.product.uid,
      product: this.productService.getProductDTOFromEntity(invoiceItem.product),
      VATAmount: invoiceItem.VATAmount,
      WHTAmount: invoiceItem.WHTAmount,
    };
  }
}
