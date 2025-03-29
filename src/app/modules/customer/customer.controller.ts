import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { CompanyUid } from '../../decorators/company.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  // @UseGuards(AuthGuard)
  @Post('')
  async createCustomer(
    @Body() customerDTO: CustomerDTO,
    @CompanyUid() companyUid: string,
  ) {
    try {
      return await this.customerService.createCustomer(customerDTO, companyUid);
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
  async getAllCustomers(@CompanyUid() companyUid: string) {
    try {
      return await this.customerService.getAllCustomers(companyUid);
    } catch (e) {
      throw e;
    }
  }
}
