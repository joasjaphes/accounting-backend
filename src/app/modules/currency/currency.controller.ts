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
import { CurrencyService } from './currency.service';
import { CurrencyDTO } from './currency.dto';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('currencies')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  async createCurrency(@Body() currency: CurrencyDTO, @Request() request) {
    try {
      return await this.currencyService.saveCurrency(
        currency,
        request.currentUser,
      );
    } catch (e) {
      console.error('Failed to create currency', e);
      throw e;
    }
  }

  @Put()
  async updateCurrency(@Body() currency: CurrencyDTO, @Request() request) {
    try {
      return await this.currencyService.saveCurrency(
        currency,
        request.currentUser,
      );
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
