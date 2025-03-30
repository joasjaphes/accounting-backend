import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDTO } from './store.dto';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';
import { request } from 'http';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  async createStore(
    @Body() store: StoreDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.storeService.saveStore(
        store,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create store', e);
      throw e;
    }
  }

  @Put()
  async updateStore(@Body() store: StoreDTO, @Request() request) {
    try {
      return await this.storeService.saveStore(store, request.currentUser);
    } catch (e) {
      console.error('Failed to update store', e);
      throw e;
    }
  }

  @Get()
  async getStores(@CompanyUid() companyUid: string) {
    try {
      return await this.storeService.getStores(companyUid);
    } catch (e) {
      console.error('Failed to get stores', e);
      throw e;
    }
  }
}
