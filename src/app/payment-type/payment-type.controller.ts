import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { PaymentTypeDTO } from './payment-type.dto';
import { PaymentTypeService } from './payment-type.service';

@Controller('paymentTypes')
export class PaymentTypeController {
  constructor(private paymentTypeService: PaymentTypeService) {}

  @Post()
  async createPaymentType(@Body() paymentType: PaymentTypeDTO) {
    try {
      return await this.paymentTypeService.savePaymentType(paymentType);
    } catch (e) {
      console.error('Failed to create payment type', e);
      throw e;
    }
  }

  @Put()
  async updatePaymentType(@Body() paymentType: PaymentTypeDTO) {
    try {
      return await this.paymentTypeService.savePaymentType(paymentType);
    } catch (e) {
      console.error('Failed to update payment type', e);
      throw e;
    }
  }

  @Get()
  async getPaymentTypes() {
    try {
      return await this.paymentTypeService.getPaymentTypes();
    } catch (e) {
      console.error('Failed to get paymentTypes', e);
      throw e;
    }
  }
}
