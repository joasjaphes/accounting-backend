import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  // @UseGuards(AuthGuard)
  @Post('')
  async createCustomer(
    @Body() customerDTO: CustomerDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.customerService.createCustomer(
        customerDTO,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      throw e;
    }
  }

  @Put('')
  async updateCustomer(@Body() customerDTO: CustomerDTO, @Request() request) {
    try {
      return await this.customerService.updateCustomer(
        customerDTO,
        request.currentUser,
      );
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
