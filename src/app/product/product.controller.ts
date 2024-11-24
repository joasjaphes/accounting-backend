import { Body, Controller, Post, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Company } from '../company/company.entity';
import { CompanyUid } from '../decorators/company.decorator';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async saveProduct(@Body() body) {
    try {
      return await this.productService.saveProduct(body);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async getProducts(@CompanyUid() companyUid: string) {
    try {
      return await this.productService.getProducts(companyUid);
    } catch (e) {
      throw e;
    }
  }
}
