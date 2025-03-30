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
import { ProductCategoryDTO } from './product-category.dto';
import { ProductCategoryService } from './product-category.service';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';
import { request } from 'http';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('productCategories')
export class ProductCategoryController {
  constructor(private productCategoriesService: ProductCategoryService) {}

  @Post()
  async createProductCategory(
    @Body() productCategory: ProductCategoryDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.productCategoriesService.saveProductCategory(
        productCategory,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create product category', e);
      throw e;
    }
  }

  @Put()
  async updateProductCategory(
    @Body() productCategory: ProductCategoryDTO,
    @Request() request,
  ) {
    try {
      return await this.productCategoriesService.saveProductCategory(
        productCategory,
        request.currentUser,
      );
    } catch (e) {
      console.error('Failed to update product category', e);
      throw e;
    }
  }

  @Get()
  async getProductCategories(@CompanyUid() companyUid: string) {
    try {
      return await this.productCategoriesService.getProductCategories(
        companyUid,
      );
    } catch (e) {
      console.error('Failed to get product categories', e);
      throw e;
    }
  }
}
