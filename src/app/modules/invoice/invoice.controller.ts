import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDTO } from './invoice.dto';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}
  @Post('')
  async createInvoice(
    @Body() invoicePayload: InvoiceDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.invoiceService.createInvoice(
        invoicePayload,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      throw e;
    }
  }
  @Get('')
  async getInvoices(@CompanyUid() companyUid: string) {
    try {
      return await this.invoiceService.getInvoices(companyUid);
    } catch (e) {
      throw e;
    }
  }
}
