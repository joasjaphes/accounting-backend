import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get(':id')
  async getComapny(@Param('id') id: string): Promise<CompanyDTO> {
    try {
      return await this.companyService.getCompanyByUId(id);
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

  @Put()
  async updateCompany(@Body() company: CompanyDTO): Promise<CompanyDTO> {
    try {
      return await this.companyService.updateCompany(company);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
