import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDTO } from './company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async getAllCompanies(): Promise<CompanyDTO[]> {
    try {
      return await this.companyService.getAllCompanies();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @Post()
  async createCompany(@Body() company: CompanyDTO): Promise<CompanyDTO> {
    try {
      return await this.companyService.createCompany(company);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
