import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from './payment-type.entity';
import { Repository } from 'typeorm';
import { PaymentTypeDTO } from './payment-type.dto';
import { CompanyService } from '../company/company.service';
import { User } from '../user/user.entity';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType) private repository: Repository<PaymentType>,
    private companyService: CompanyService,
  ) {}

  async createPaymentType(
    paymentTypeDTO: PaymentTypeDTO,
    currentUser: User,
    companyUid?: string,
  ) {
    try {
      const paymentType = this.getPaymentTypeFromDTO(paymentTypeDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || paymentTypeDTO.companyId,
      );
      paymentType.company = company;
      paymentType.createdBy = currentUser;
      paymentType.updatedBy = currentUser;
      return await paymentType.save();
    } catch (e) {
      console.error('Failed to save payment type', e);
      throw e;
    }
  }

  async savePaymentType(
    paymentTypeDTO: PaymentTypeDTO,
    currentUser: User,
    companyUid?: string,
  ) {
    try {
      const refPaymentType = await this.findPaymentTypeByUID(paymentTypeDTO.id);
      if (!refPaymentType) {
        await this.createPaymentType(paymentTypeDTO, currentUser, companyUid);
      } else {
        const updatedPaymentType = this.getPaymentTypeFromDTO(
          paymentTypeDTO,
          refPaymentType,
        );
        updatedPaymentType.updatedBy = currentUser;
        return await updatedPaymentType.save();
      }
    } catch (e) {
      console.error('Failed to save payment type', e);
      throw e;
    }
  }

  async getPaymentTypes(companyUid: string) {
    try {
      const paymentTypes = await this.repository.find({
        where: { company: { uid: companyUid } },
      });
      return paymentTypes.map((paymentType) =>
        this.getPaymentTypeDTOFromPaymentType(paymentType),
      );
    } catch (e) {
      console.error('Failed to get payment types', e);
      throw e;
    }
  }

  async findPaymentTypeByUID(uid: string): Promise<PaymentType> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get payment type', e);
    }
  }

  getPaymentTypeFromDTO(
    paymentTypeDTO: PaymentTypeDTO,
    paymentType = new PaymentType(),
  ): PaymentType {
    paymentType.uid = paymentTypeDTO.id;
    paymentType.name = paymentTypeDTO.name;
    paymentType.description = paymentTypeDTO.description;
    paymentType.displayInSales = paymentTypeDTO.displayInSales;
    paymentType.displayInDebtorsPayments =
      paymentTypeDTO.displayInDebtorsPayments;
    paymentType.displayInCreditPayments =
      paymentTypeDTO.displayInCreditPayments;
    paymentType.displayInCustomerDeposits =
      paymentTypeDTO.displayInCustomerDeposits;
    paymentType.displayInRefunds = paymentTypeDTO.displayInRefunds;
    paymentType.displayInCashierReports =
      paymentTypeDTO.displayInCashierReports;
    paymentType.displayInBankingReceivingMoney =
      paymentTypeDTO.displayInBankingReceivingMoney;
    return paymentType;
  }

  getPaymentTypeDTOFromPaymentType(paymentType: PaymentType): PaymentTypeDTO {
    return {
      id: paymentType.uid,
      name: paymentType.name,
      description: paymentType.description,
      displayInSales: paymentType.displayInSales,
      displayInDebtorsPayments: paymentType.displayInDebtorsPayments,
      displayInCreditPayments: paymentType.displayInCreditPayments,
      displayInCustomerDeposits: paymentType.displayInCustomerDeposits,
      displayInRefunds: paymentType.displayInRefunds,
      displayInCashierReports: paymentType.displayInCashierReports,
      displayInBankingReceivingMoney:
        paymentType.displayInBankingReceivingMoney,
    };
  }
}
