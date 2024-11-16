import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ProductCategoryDTO } from './product-category.dto';
import { ProductCategoryService } from './product-category.service';

@Controller('productCategories')
export class ProductCategoryController {
  constructor(private productCategoriesService: ProductCategoryService) {}

  @Post()
  async createProductCategory(@Body() productCategory: ProductCategoryDTO) {
    try {
      return await this.productCategoriesService.saveProductCategory(
        productCategory,
      );
    } catch (e) {
      console.error('Failed to create product category', e);
      throw e;
    }
  }

  @Put()
  async updateProductCategory(@Body() productCategory: ProductCategoryDTO) {
    try {
      return await this.productCategoriesService.saveProductCategory(
        productCategory,
      );
    } catch (e) {
      console.error('Failed to update product category', e);
      throw e;
    }
  }

  @Get()
  async getProductCategories() {
    try {
      return await this.productCategoriesService.getProductCategories();
    } catch (e) {
      console.error('Failed to get product categories', e);
      throw e;
    }
  }
}