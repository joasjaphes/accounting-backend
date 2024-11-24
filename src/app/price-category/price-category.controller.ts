import { Body, Controller, Get, Post } from '@nestjs/common';
import { PriceCategoryService } from './price-category.service';
import { PriceCategoryDTO } from './price-category.dto';
import { CompanyUid } from '../decorators/company.decorator';

@Controller('priceCategories')
export class PriceCategoryController {
  constructor(private priceCategoryService: PriceCategoryService) {}

  @Post()
  async createPriceCategory(
    @Body() priceCategory: PriceCategoryDTO,
    @CompanyUid() companyUid: string,
  ) {
    console.log('priceCategory', priceCategory);
    try {
      return await this.priceCategoryService.savePriceCategory(
        priceCategory,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create price category', e);
      throw e;
    }
  }

  @Get()
  async getPriceCategories(@CompanyUid() companyUid) {
    try {
      return await this.priceCategoryService.getPriceCategories(companyUid);
    } catch (e) {
      console.error('Failed to get price categories', e);
      throw e;
    }
  }
}
