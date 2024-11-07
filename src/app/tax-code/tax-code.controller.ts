import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TaxCodeDTO } from './tax-code.dto';
import { TaxCodeService } from './tax-code.service';

@Controller('taxCodes')
export class TaxCodeController {
  constructor(private taxCodeService: TaxCodeService) {}

  @Post()
  async createTaxCode(@Body() taxCode: TaxCodeDTO) {
    try {
      return await this.taxCodeService.saveTaxCode(taxCode);
    } catch (e) {
      console.error('Failed to create tax code', e);
      throw e;
    }
  }

  @Put()
  async updateTaxCode(@Body() taxCode: TaxCodeDTO) {
    try {
      return await this.taxCodeService.saveTaxCode(taxCode);
    } catch (e) {
      console.error('Failed to update tax code', e);
      throw e;
    }
  }

  @Get()
  async getTaxCodes() {
    try {
      return await this.taxCodeService.getTaxCodes();
    } catch (e) {
      console.error('Failed to get tax codes', e);
      throw e;
    }
  }
}
