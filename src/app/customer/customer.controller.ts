import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  // @UseGuards(AuthGuard)
  @Post('')
  async createCustomer(@Body() customerDTO: CustomerDTO) {
    try {
      return await this.customerService.createCustomer(customerDTO);
    } catch (e) {
      throw e;
    }
  }

  @Put('')
  async updateCustomer(@Body() customerDTO: CustomerDTO) {
    try {
      return await this.customerService.updateCustomer(customerDTO);
    } catch (e) {
      throw e;
    }
  }

  @Delete(':uid')
  async deleteCustomer(@Param('uid') id: string) {
    try {
      return await this.customerService.deleteCustomer(id);
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
