import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('')
  async createCustomer(@Body() customerDTO: CustomerDTO) {
    try {
      return await this.customerService.createCustomer(customerDTO);
    } catch (e) {
      throw e;
    }
  }

  @Get('')
  async getAllCustomers() {
    try {
      return await this.customerService.getAllCustomers();
    } catch (e) {
      throw e;
    }
  }
}
