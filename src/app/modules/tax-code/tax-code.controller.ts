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
import { TaxCodeDTO } from './tax-code.dto';
import { TaxCodeService } from './tax-code.service';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';
import { request } from 'http';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('taxCodes')
export class TaxCodeController {
  constructor(private taxCodeService: TaxCodeService) {}

  @Post()
  async createTaxCode(
    @Body() taxCode: TaxCodeDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.taxCodeService.saveTaxCode(
        taxCode,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create tax code', e);
      throw e;
    }
  }

  @Put()
  async updateTaxCode(@Body() taxCode: TaxCodeDTO, @Request() request) {
    try {
      return await this.taxCodeService.saveTaxCode(
        taxCode,
        request.currentUser,
      );
    } catch (e) {
      console.error('Failed to update tax code', e);
      throw e;
    }
  }

  @Get()
  async getTaxCodes(@CompanyUid() companyUid: string) {
    try {
      return await this.taxCodeService.getTaxCodes(companyUid);
    } catch (e) {
      console.error('Failed to get tax codes', e);
      throw e;
    }
  }
}
