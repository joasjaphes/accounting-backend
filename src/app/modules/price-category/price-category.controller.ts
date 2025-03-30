import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PriceCategoryService } from './price-category.service';
import { PriceCategoryDTO } from './price-category.dto';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';
import { request } from 'http';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('priceCategories')
export class PriceCategoryController {
  constructor(private priceCategoryService: PriceCategoryService) {}

  @Post()
  async createPriceCategory(
    @Body() priceCategory: PriceCategoryDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    console.log('priceCategory', priceCategory);
    try {
      return await this.priceCategoryService.savePriceCategory(
        priceCategory,
        request.currentUser,
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
