import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { PackagingDTO } from './packaging.dto';
import { CompanyUid } from '../../decorators/company.decorator';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/app/interceptors/current-user.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('packaging')
export class PackagingController {
  constructor(private packagingService: PackagingService) {}
  @Post()
  async createPackaging(
    @Body() packaging: PackagingDTO,
    @CompanyUid() companyUid: string,
    @Request() request,
  ) {
    try {
      return await this.packagingService.savePackaging(
        packaging,
        request.currentUser,
        companyUid,
      );
    } catch (e) {
      console.error('Failed to create packaging', e);
      throw e;
    }
  }

  @Get()
  async getPackagings(@CompanyUid() companyUid: string) {
    try {
      return await this.packagingService.getPackagings(companyUid);
    } catch (e) {
      console.error('Failed to get packagings', e);
      throw e;
    }
  }
}
