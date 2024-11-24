import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './customer.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
    private companyService: CompanyService,
  ) {}

  async createCustomer(customerPayload: CustomerDTO, companyUid?: string) {
    try {
      const customer = this.getCustomerObjectFromDTO(customerPayload);
      const company = await this.companyService.findCompanyByUid(
        companyUid || customerPayload.companyId,
      );
      customer.company = company;
      return await customer.save();
    } catch (e) {
      throw e;
    }
  }

  async updateCustomer(customerPayload: CustomerDTO) {
    try {
      const customer = await this.findCustomerByUID(customerPayload.id);
      customer.name = customerPayload.name;
      customer.address = customerPayload.address;
      customer.phoneNumber = customerPayload.phoneNumber;
      customer.email = customerPayload.email;
      return await customer.save();
    } catch (e) {
      throw e;
    }
  }

  async deleteCustomer(uid: string) {
    try {
      const customer = await this.findCustomerByUID(uid);
      customer.deleted = true;
      await customer.save();
      return {
        message: `Customer with uid ${uid} was deleted successfully`,
        status: 'SUCCESS',
      };
    } catch (e) {
      throw e;
    }
  }

  async findCustomerByUID(uid: string): Promise<Customer> {
    try {
      const customer = await this.repository.findOne({
        where: { uid, deleted: false },
      });
      if (customer) {
        return customer;
      } else {
        throw new NotFoundException(`Customer with uid ${uid} does not exist.`);
      }
    } catch (e) {
      throw e;
    }
  }

  async getCustomerByUID(uid: string) {
    try {
      const customer = await this.findCustomerByUID(uid);
      return this.getCustomerDTO(customer);
    } catch (e) {
      throw e;
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.repository.find({
        where: { deleted: false },
      });
      return customers.map((customer) => this.getCustomerDTO(customer));
    } catch (e) {
      throw e;
    }
  }

  getCustomerObjectFromDTO(customerDTO: CustomerDTO): Customer {
    const customer = new Customer();
    customer.uid = customerDTO.id;
    customer.name = customerDTO.name;
    customer.address = customerDTO.address;
    customer.email = customerDTO.email;
    customer.phoneNumber = customerDTO.phoneNumber;
    return customer;
  }

  getCustomerDTO(customer: Customer): CustomerDTO {
    return {
      id: customer.uid,
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
    };
  }
}
