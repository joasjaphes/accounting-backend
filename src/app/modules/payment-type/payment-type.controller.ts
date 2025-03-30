import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentTypeDTO } from './payment-type.dto';
import { PaymentTypeService } from './payment-type.service';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';
import { request } from 'http';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('paymentTypes')
export class PaymentTypeController {
  constructor(private paymentTypeService: PaymentTypeService) {}

  @Post()
  async createPaymentType(
    @Body() paymentType: PaymentTypeDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.paymentTypeService.savePaymentType(
        paymentType,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create payment type', e);
      throw e;
    }
  }

  @Put()
  async updatePaymentType(
    @Body() paymentType: PaymentTypeDTO,
    @Request() request,
  ) {
    try {
      return await this.paymentTypeService.savePaymentType(
        paymentType,
        request.currentUser,
      );
    } catch (e) {
      console.error('Failed to update payment type', e);
      throw e;
    }
  }

  @Get()
  async getPaymentTypes(@CompanyUid() companyUid: string) {
    try {
      return await this.paymentTypeService.getPaymentTypes(companyUid);
    } catch (e) {
      console.error('Failed to get paymentTypes', e);
      throw e;
    }
  }
}
