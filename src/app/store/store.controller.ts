import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDTO } from './store.dto';

@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  async createStore(@Body() store: StoreDTO) {
    try {
      return await this.storeService.saveStore(store);
    } catch (e) {
      console.error('Failed to create store', e);
      throw e;
    }
  }

  @Put()
  async updateStore(@Body() store: StoreDTO) {
    try {
      return await this.storeService.saveStore(store);
    } catch (e) {
      console.error('Failed to update store', e);
      throw e;
    }
  }

  @Get()
  async getStores() {
    try {
      return await this.storeService.getStores();
    } catch (e) {
      console.error('Failed to get stores', e);
      throw e;
    }
  }
}
