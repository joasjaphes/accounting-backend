import { Body, Controller, Get, Post } from '@nestjs/common';
import { PriceCategoryService } from './price-category.service';
import { PriceCategoryDTO } from './price-category.dto';

@Controller('priceCategories')
export class PriceCategoryController {
  constructor(private priceCategoryService: PriceCategoryService) {}

  @Post()
  async createPriceCategory(@Body() priceCategory: PriceCategoryDTO) {
    console.log('priceCategory', priceCategory);
    try {
      return await this.priceCategoryService.savePriceCategory(priceCategory);
    } catch (e) {
      console.error('Failed to create price category', e);
      throw e;
    }
  }

  @Get()
  async getPriceCategories() {
    try {
      return await this.priceCategoryService.getPriceCategories();
    } catch (e) {
      console.error('Failed to get price categories', e);
      throw e;
    }
  }
}
