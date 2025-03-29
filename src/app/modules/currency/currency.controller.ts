import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyDTO } from './currency.dto';
import { Company } from '../company/company.entity';
import { CompanyUid } from '../../decorators/company.decorator';

@Controller('currencies')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  async createCurrency(@Body() currency: CurrencyDTO) {
    try {
      return await this.currencyService.saveCurrency(currency);
    } catch (e) {
      console.error('Failed to create currency', e);
      throw e;
    }
  }

  @Put()
  async updateCurrency(@Body() currency: CurrencyDTO) {
    try {
      return await this.currencyService.saveCurrency(currency);
    } catch (e) {
      console.error('Failed to update currency', e);
      throw e;
    }
  }

  @Get()
  async getCurrencies(
    @CompanyUid() companyUid: string,
  ): Promise<CurrencyDTO[]> {
    try {
      return await this.currencyService.getCurrencies(companyUid);
    } catch (e) {
      console.error('Failed to get currency', e);
      throw e;
    }
  }
}
