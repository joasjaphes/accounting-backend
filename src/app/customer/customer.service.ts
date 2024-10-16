import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}

  async createCustomer(customerPayload: CustomerDTO) {
    try {
      const customer = this.getCustomerObjectFromDTO(customerPayload);
      return await customer.save();
    } catch (e) {
      throw e;
    }
  }

  async getAllCustomers() {
    try {
      return await this.repository.find();
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
}
