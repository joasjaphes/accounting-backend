import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { ProductService } from '../product/product.service';
import { InvoiceDTO } from './invoice.dto';
import { InvoiceItemDTO } from './invoice-item.dto';
import { CustomerService } from '../customer/customer.service';
import moment from 'moment';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
    private productService: ProductService,
    private customerService: CustomerService,
  ) {}

  async createInvoice(invoicePayload: InvoiceDTO) {
    // console.log('invoice payload', invoicePayload);
    try {
      const invoice = this.getInvoicePayloadFromDTO(invoicePayload);
      invoice.customer = await this.customerService.findCustomerByUID(
        invoicePayload.customerId,
      );
      invoice.invoiceNumber = await this.getInvoiceNumber(invoicePayload);
      const savedInvoice = await invoice.save();
      // await this.invoiceRepository.save([invoice]);
      await this.saveInvoiceItems(invoicePayload, invoice);
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
    invoice.date = new Date(invoiceDto.date);
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
      invoiceNumber: invoice.invoiceNumber,
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

  async getInvoiceNumber(invoice: InvoiceDTO) {
    try {
      const year = new Date(invoice.date).getFullYear();
      const invoiceNumber = await this.invoiceRepository.count();
      return `INV/${year}/${invoiceNumber}`;
    } catch (e) {
      console.error('Failed to generate invoice number', e);
    }
  }
}
