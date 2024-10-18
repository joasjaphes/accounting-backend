import { Body, Controller, Post, Get } from '@nestjs/common';
import { ProductService } from './product.service';

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
  async getProducts() {
    try {
      return await this.productService.getProducts();
    } catch (e) {
      throw e;
    }
  }
}
