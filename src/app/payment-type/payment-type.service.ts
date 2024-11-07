import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from './payment-type.entity';
import { Repository } from 'typeorm';
import { PaymentTypeDTO } from './payment-type.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType) private repository: Repository<PaymentType>,
    private companyService: CompanyService,
  ) {}

  async createPaymentType(paymentTypeDTO: PaymentTypeDTO) {
    try {
      const paymentType = this.getPaymentTypeFromDTO(paymentTypeDTO);
      const company = await this.companyService.findCompanyByUid(
        paymentTypeDTO.companyId,
      );
      paymentType.company = company;
      return await paymentType.save();
    } catch (e) {
      console.error('Failed to save payment type', e);
      throw e;
    }
  }

  async savePaymentType(paymentTypeDTO: PaymentTypeDTO) {
    try {
      const refPaymentType = await this.findPaymentTypeByUID(paymentTypeDTO.id);
      if (!refPaymentType) {
        await this.createPaymentType(paymentTypeDTO);
      } else {
        refPaymentType.name = paymentTypeDTO.name;
        refPaymentType.description = paymentTypeDTO.description;
        refPaymentType.displayInSales = paymentTypeDTO.displayInSales;
        refPaymentType.displayInDebtorsPayments =
          paymentTypeDTO.displayInDebtorsPayments;
        refPaymentType.displayInCreditPayments =
          paymentTypeDTO.displayInCreditPayments;
        refPaymentType.displayInCustomerDeposits =
          paymentTypeDTO.displayInCustomerDeposits;
        refPaymentType.displayInRefunds = paymentTypeDTO.displayInRefunds;
        refPaymentType.displayInCashierReports =
          paymentTypeDTO.displayInCashierReports;
        refPaymentType.displayInBankingReceivingMoney =
          paymentTypeDTO.displayInBankingReceivingMoney;
        return await refPaymentType.save();
      }
    } catch (e) {
      console.error('Failed to save payment type', e);
      throw e;
    }
  }

  async getPaymentTypes() {
    try {
      const paymentTypes = await this.repository.find();
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

  getPaymentTypeFromDTO(paymentTypeDTO: PaymentTypeDTO): PaymentType {
    const paymentType = new PaymentType();
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
