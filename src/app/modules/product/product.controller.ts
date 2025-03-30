import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Company } from '../company/company.entity';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';
import { request } from 'http';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async saveProduct(
    @Body() body,
    @CompanyUid() companyUid,
    @Request() request,
  ) {
    try {
      return await this.productService.saveProduct(
        body,
        request.currentUser,
        companyUid,
      );
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
