import { Body, Controller, Get, Post } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { PackagingDTO } from './packaging.dto';

@Controller('packaging')
export class PackagingController {
  constructor(private packagingService: PackagingService) {}
  @Post()
  async createPackaging(@Body() packaging: PackagingDTO) {
    try {
      return await this.packagingService.savePackaging(packaging);
    } catch (e) {
      console.error('Failed to create packaging', e);
      throw e;
    }
  }

  @Get()
  async getPackagings() {
    try {
      return await this.packagingService.getPackagings();
    } catch (e) {
      console.error('Failed to get packagings', e);
      throw e;
    }
  }
}