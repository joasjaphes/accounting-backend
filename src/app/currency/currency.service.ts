import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { Repository } from 'typeorm';
import { CurrencyDTO } from './currency.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency) private repository: Repository<Currency>,
    private companyService: CompanyService,
  ) {}

  async createCurrency(currencyDTO: CurrencyDTO, companyUid?: string) {
    try {
      const currency = this.getCurrencyFromDTO(currencyDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || currencyDTO.companyId,
      );
      currency.company = company;
      return await currency.save();
    } catch (e) {
      console.error('Failed to save currency', e);
      throw e;
    }
  }

  async saveCurrency(currencyDTO: CurrencyDTO, companyUid?: string) {
    try {
      const refCurrency = await this.findCurrencyByUid(currencyDTO.id);
      if (!refCurrency) {
        await this.createCurrency(currencyDTO, companyUid);
      } else {
        const payload = this.getCurrencyFromDTO(currencyDTO, refCurrency);
        return await payload.save();
      }
    } catch (e) {
      console.error('Failed to update currency', e);
      throw e;
    }
  }

  async getCurrencies() {
    try {
      const currencies = await this.repository.find();
      return currencies.map((currency) =>
        this.getCurrencyDTOFromCurrency(currency),
      );
    } catch (e) {
      console.error('Failed to get currencies', e);
      throw e;
    }
  }

  async findCurrencyByUid(uid: string): Promise<Currency> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get currency', e);
    }
  }

  getCurrencyFromDTO(
    currencyDto: CurrencyDTO,
    currency = new Currency(),
  ): Currency {
    currency.uid = currencyDto.id;
    currency.name = currencyDto.name;
    currency.description = currencyDto.description;
    currency.exchangeRate = currencyDto.exchangeRate;
    currency.isDefaultLocalCurrency = currencyDto.isDefaultLocalCurrency;
    currency.symbol = currencyDto.symbol;
    return currency;
  }

  getCurrencyDTOFromCurrency(currency: Currency): CurrencyDTO {
    return {
      id: currency.uid,
      name: currency.name,
      description: currency.description,
      exchangeRate: currency.exchangeRate,
      isDefaultLocalCurrency: currency.isDefaultLocalCurrency,
      symbol: currency.symbol,
    };
  }
}
