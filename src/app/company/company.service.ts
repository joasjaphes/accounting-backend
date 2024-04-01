import { Injectable, Logger } from '@nestjs/common';
// import { CompanyRepository } from './company.repository';
import { Company } from './company.entity';
import { CompanyDTO } from './company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private repository: Repository<Company>
  ) {}

  async createCompany(company: CompanyDTO): Promise<CompanyDTO> {
    try {
      const companyPayload: Company = await this.getCompanyPayloadFromDTO(
        company
      );
      const createdCompany: Company = await this.repository.save(
        companyPayload
      );
      Logger.log('Company Created: ' + JSON.stringify(createdCompany));
      return this.getCompanyDTOFromPayload(createdCompany);
    } catch (e) {
      console.error(e);
      Logger.error('Failed to create company', e);
      throw e;
    }
  }

  async updateCompany(company: CompanyDTO): Promise<CompanyDTO> {
    try {
      const companyPayload: Company = await this.getCompanyPayloadFromDTO(
        company
      );
      const result = await this.repository.update(
        { uid: company.id },
        companyPayload
      );
      console.log(result);
      return company;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getCompanyByUId(uid: string): Promise<CompanyDTO> {
    try {
      const company: Company = await this.repository.findOne({
        where: { uid },
      });
      return this.getCompanyDTOFromPayload(company);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllCompanies(): Promise<CompanyDTO[]> {
    try {
      const companies: Company[] = await this.repository.find();
      return companies.map((company) => this.getCompanyDTOFromPayload(company));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getCompanyPayloadFromDTO(company: CompanyDTO): Promise<Company> {
    const savedCompany: Company = await this.repository.findOne({
      where: { uid: company.id },
    });
    const companyPayload: Company = savedCompany ?? this.repository.create();
    companyPayload.name = company.name;
    companyPayload.description = company.description ?? '';
    companyPayload.uid = company.id;
    companyPayload.address = company.address ?? '';
    return companyPayload;
  }

  getCompanyDTOFromPayload(company: Company): CompanyDTO {
    const companyDTO: CompanyDTO = {
      id: company.uid,
      name: company.name,
      description: company.description,
    };
    return companyDTO;
  }
}
// function InjectRepository(Company: typeof Company): (target: typeof CompanyService, propertyKey: undefined, parameterIndex: 0) => void {
//     throw new Error('Function not implemented.');
// }
