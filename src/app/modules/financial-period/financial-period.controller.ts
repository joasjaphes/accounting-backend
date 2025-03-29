import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { FinancialPeriodDTO } from './financial-period.dto';
import { FinancialPeriodService } from './financial-period.service';
import { CompanyUid } from '../../decorators/company.decorator';
import { Company } from '../company/company.entity';

@Controller('financialPeriods')
export class FinancialPeriodController {
  constructor(private financialPeriodService: FinancialPeriodService) {}

  @Post()
  async createFinancialPeriod(
    @Body() financialPeriod: FinancialPeriodDTO,
    @CompanyUid() companyUid: string,
  ) {
    try {
      return await this.financialPeriodService.saveFinancialPeriod(
        financialPeriod,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create financial period', e);
      throw e;
    }
  }

  @Put()
  async updateFinancialPeriod(@Body() financialPeriod: FinancialPeriodDTO) {
    try {
      return await this.financialPeriodService.saveFinancialPeriod(
        financialPeriod,
      );
    } catch (e) {
      console.error('Failed to update financial period', e);
      throw e;
    }
  }

  @Get()
  async getFinancialPeriods(@CompanyUid() companyUid: string) {
    try {
      return await this.financialPeriodService.getFinancialPeriods(companyUid);
    } catch (e) {
      console.error('Failed to get financial periods', e);
      throw e;
    }
  }
}
