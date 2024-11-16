import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Packaging } from './packaging.entity';
import { PackagingDTO } from './packaging.dto';
import { CompanyService } from '../company/company.service';
import { Repository } from 'typeorm';

@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(Packaging) private repository: Repository<Packaging>,
    private companyService: CompanyService,
  ) {}

  async createPackaging(packagingDTO: PackagingDTO) {
    try {
      const packaging = this.getPackagingFromDTO(packagingDTO);
      const company = await this.companyService.findCompanyByUid(
        packagingDTO.companyId,
      );
      packaging.company = company;
      return await packaging.save();
    } catch (e) {
      console.error('Failed to create packaging', e);
      throw e;
    }
  }

  async savePackaging(packaging: PackagingDTO) {
    try {
      const refPackaging = await this.getPackagingByUID(packaging.id);
      if (!refPackaging) {
        await this.createPackaging(packaging);
      } else {
        const packagingPayload = this.getPackagingFromDTO(
          packaging,
          refPackaging,
        );
        return await packagingPayload.save();
      }
    } catch (e) {
      console.error('Failed to save packaging', e);
      throw e;
    }
  }

  async getPackagingByUID(uid: string) {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get packaging by UID');
    }
  }
  async getPackagings() {
    try {
      const packagings = await this.repository.find();
      return packagings.map((packaging) =>
        this.getPackagingDTOFromPackaging(packaging),
      );
    } catch (e) {
      console.error('Failed to get packagings', e);
      throw e;
    }
  }

  getPackagingFromDTO(
    packagingDTO: PackagingDTO,
    packaging = new Packaging(),
  ): Packaging {
    packaging.name = packagingDTO.name;
    packaging.uid = packagingDTO.id;
    packaging.description = packagingDTO.description;
    packaging.pieces = packagingDTO.pieces;
    return packaging;
  }

  getPackagingDTOFromPackaging(packaging: Packaging): PackagingDTO {
    return {
      id: packaging.uid,
      name: packaging.name,
      description: packaging.description,
      pieces: packaging.pieces,
      companyId: packaging.company.uid,
    };
  }
}