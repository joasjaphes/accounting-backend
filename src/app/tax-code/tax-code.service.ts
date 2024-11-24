import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxCode } from './tax-code.entity';
import { Repository } from 'typeorm';
import { TaxCodeDTO } from './tax-code.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class TaxCodeService {
  constructor(
    @InjectRepository(TaxCode) private repository: Repository<TaxCode>,
    private companyService: CompanyService,
  ) {}

  async createTaxCode(taxCodeDTO: TaxCodeDTO, companyUid?: string) {
    try {
      const taxCode = this.getTaxCodeFromTaxCodeDTO(taxCodeDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || taxCodeDTO.companyId,
      );
      taxCode.company = company;
      return await taxCode.save();
    } catch (e) {
      console.error('Failed to save tax code', e);
      throw e;
    }
  }

  async saveTaxCode(taxCodeDTO: TaxCodeDTO, companyUid?: string) {
    try {
      const refTaxCode = await this.findTaxCodeByUid(taxCodeDTO.id);
      if (!refTaxCode) {
        await this.createTaxCode(taxCodeDTO, companyUid);
      } else {
        const updatedTaxCode = this.getTaxCodeFromTaxCodeDTO(
          taxCodeDTO,
          refTaxCode,
        );
        return await updatedTaxCode.save();
      }
    } catch (e) {
      console.error('Failed to save tax code', e);
      throw e;
    }
  }

  async getTaxCodes(companyUid: string) {
    try {
      const taxCodes = await this.repository.find({
        where: { company: { uid: companyUid } },
      });
      return taxCodes.map((taxCode) => this.getTaxCodeDTOFromTaxCode(taxCode));
    } catch (e) {
      console.error('Failed to get tax codes', e);
      throw e;
    }
  }

  async findTaxCodeByUid(uid: string): Promise<TaxCode> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get tax code', e);
    }
  }

  getTaxCodeFromTaxCodeDTO(
    taxCodeDTO: TaxCodeDTO,
    taxCode = new TaxCode(),
  ): TaxCode {
    if (!taxCode.uid) {
      taxCode.uid = taxCodeDTO.id;
    }
    taxCode.name = taxCodeDTO.name;
    taxCode.description = taxCodeDTO.description;
    taxCode.rate = taxCodeDTO.rate;
    taxCode.indicator = taxCodeDTO.indicator;
    taxCode.EFDDepartmentCode = taxCodeDTO.EFDDepartmentCode;
    taxCode.salesAccount = taxCodeDTO.salesAccount;
    taxCode.purchasesAccount = taxCodeDTO.purchasesAccount;
    return taxCode;
  }

  getTaxCodeDTOFromTaxCode(taxCode: TaxCode): TaxCodeDTO {
    return {
      id: taxCode.uid,
      name: taxCode.name,
      description: taxCode.description,
      rate: taxCode.rate,
      indicator: taxCode.indicator,
      EFDDepartmentCode: taxCode.EFDDepartmentCode,
      salesAccount: taxCode.salesAccount,
      purchasesAccount: taxCode.purchasesAccount,
    };
  }
}
