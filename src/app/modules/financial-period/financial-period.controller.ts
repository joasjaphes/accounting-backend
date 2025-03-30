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
import { FinancialPeriodDTO } from './financial-period.dto';
import { FinancialPeriodService } from './financial-period.service';
import { CompanyUid } from '../../decorators/company.decorator';
import { Company } from '../company/company.entity';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('financialPeriods')
export class FinancialPeriodController {
  constructor(private financialPeriodService: FinancialPeriodService) {}

  @Post()
  async createFinancialPeriod(
    @Body() financialPeriod: FinancialPeriodDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.financialPeriodService.saveFinancialPeriod(
        financialPeriod,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create financial period', e);
      throw e;
    }
  }

  @Put()
  async updateFinancialPeriod(
    @Body() financialPeriod: FinancialPeriodDTO,
    @Request() request,
  ) {
    try {
      return await this.financialPeriodService.saveFinancialPeriod(
        financialPeriod,
        request.currentUser,
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
