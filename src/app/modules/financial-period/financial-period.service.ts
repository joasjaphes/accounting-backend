import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialPeriod } from './financial-period.entity';
import { Repository } from 'typeorm';
import { FinancialPeriodDTO } from './financial-period.dto';
import { CompanyService } from '../company/company.service';
import { User } from '../user/user.entity';

@Injectable()
export class FinancialPeriodService {
  constructor(
    @InjectRepository(FinancialPeriod)
    private repository: Repository<FinancialPeriod>,
    private companyService: CompanyService,
  ) {}

  async createFinancialPeriod(
    financialPeriodDTO: FinancialPeriodDTO,
    currentUser: User,
    companyUid?: string,
  ) {
    try {
      const financialPeriod =
        this.getFinancialPeriodFromFinancialPeriodDTO(financialPeriodDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || financialPeriodDTO.companyId,
      );
      financialPeriod.createdBy = currentUser;
      financialPeriod.updatedBy = currentUser;
      financialPeriod.company = company;
      return await financialPeriod.save();
    } catch (e) {
      console.error('Failed to save financialPeriod', e);
      throw e;
    }
  }

  async saveFinancialPeriod(
    financialPeriodDTO: FinancialPeriodDTO,
    currentUser: User,
    companyUid?: string,
  ) {
    try {
      const refFinancialPeriod = await this.findFinancialPeriodByUid(
        financialPeriodDTO.id,
      );
      if (!refFinancialPeriod) {
        await this.createFinancialPeriod(
          financialPeriodDTO,
          currentUser,
          companyUid,
        );
      } else {
        const updatedTaxCode = this.getFinancialPeriodFromFinancialPeriodDTO(
          financialPeriodDTO,
          refFinancialPeriod,
        );
        updatedTaxCode.updatedBy = currentUser;
        return await updatedTaxCode.save();
      }
    } catch (e) {
      console.error('Failed to save financial period', e);
      throw e;
    }
  }

  async getFinancialPeriods(companyUid: string) {
    try {
      const financialPeriods = await this.repository.find({
        where: { company: { uid: companyUid } },
      });
      return financialPeriods.map((financialPeriod) =>
        this.getFinancialPeriodDTOFromFinancialPeriod(financialPeriod),
      );
    } catch (e) {
      console.error('Failed to get financial periods', e);
      throw e;
    }
  }

  async findFinancialPeriodByUid(uid: string): Promise<FinancialPeriod> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get financial period', e);
    }
  }

  getFinancialPeriodFromFinancialPeriodDTO(
    financialPeriodDTO: FinancialPeriodDTO,
    financialPeriod = new FinancialPeriod(),
  ): FinancialPeriod {
    if (!financialPeriod.uid) {
      financialPeriod.uid = financialPeriodDTO.id;
    }
    financialPeriod.name = financialPeriodDTO.name;
    financialPeriod.description = financialPeriodDTO.description;
    financialPeriod.startDate = financialPeriodDTO.startDate;
    financialPeriod.endDate = financialPeriodDTO.endDate;
    financialPeriod.costingMethod = financialPeriodDTO.costingMethod;
    financialPeriod.status = financialPeriodDTO.status;
    return financialPeriod;
  }

  getFinancialPeriodDTOFromFinancialPeriod(
    financialPeriod: FinancialPeriod,
  ): FinancialPeriodDTO {
    return {
      id: financialPeriod.uid,
      name: financialPeriod.name,
      description: financialPeriod.description,
      startDate: financialPeriod.startDate,
      endDate: financialPeriod.endDate,
      costingMethod: financialPeriod.costingMethod,
      status: financialPeriod.status,
    };
  }
}
