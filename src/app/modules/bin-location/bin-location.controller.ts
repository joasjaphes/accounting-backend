import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { BinLocationDTO } from './bin-location.dto';
import { BinLocationService } from './bin-location.service';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('binLocations')
export class BinLocationController {
  constructor(private binLocationService: BinLocationService) {}

  @Post()
  async createBinLocation(
    @Body() binLocation: BinLocationDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.binLocationService.saveBinLocation(
        binLocation,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create bin location', e);
      throw e;
    }
  }

  @Get()
  async getBinLocations(@CompanyUid() companyUid: string) {
    try {
      return await this.binLocationService.getBinLocations(companyUid);
    } catch (e) {
      console.error('Failed to get bin locations', e);
      throw e;
    }
  }
}
