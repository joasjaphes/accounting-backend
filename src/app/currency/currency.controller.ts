import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyDTO } from './currency.dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  async createCurrency(@Body() currency: CurrencyDTO) {
    try {
      return await this.currencyService.createCurrency(currency);
    } catch (e) {
      console.error('Failed to create currency', e);
      throw e;
    }
  }

  @Put()
  async updateCurrency(@Body() currency: CurrencyDTO) {
    try {
      return await this.currencyService.updateCurrency(currency);
    } catch (e) {
      console.error('Failed to update currency', e);
      throw e;
    }
  }

  @Get()
  async getCurrencies() {
    try {
      return await this.currencyService.getCurrencies();
    } catch (e) {
      console.error('Failed to get currency', e);
      throw e;
    }
  }
}
