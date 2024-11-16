import { Body, Controller, Get, Post } from '@nestjs/common';
import { BinLocationDTO } from './bin-location.dto';
import { BinLocationService } from './bin-location.service';

@Controller('binLocations')
export class BinLocationController {
  constructor(private binLocationService: BinLocationService) {}

  @Post()
  async createBinLocation(@Body() binLocation: BinLocationDTO) {
    try {
      return await this.binLocationService.saveBinLocation(binLocation);
    } catch (e) {
      console.error('Failed to create bin location', e);
      throw e;
    }
  }

  @Get()
  async getBinLocations() {
    try {
      return await this.binLocationService.getBinLocations();
    } catch (e) {
      console.error('Failed to get bin locations', e);
      throw e;
    }
  }
}
