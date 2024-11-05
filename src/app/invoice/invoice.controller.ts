import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDTO } from './invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}
  @Post('')
  async createInvoice(@Body() invoicePayload: InvoiceDTO) {
    try {
      return await this.invoiceService.createInvoice(invoicePayload);
    } catch (e) {
      throw e;
    }
  }
  @Get('')
  async getInvoices() {
    try {
      return await this.invoiceService.getInvoices();
    } catch (e) {
      throw e;
    }
  }
}