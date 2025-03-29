import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BinLocation } from './bin-location.entity';
import { Repository } from 'typeorm';
import { BinLocationDTO } from './bin-location.dto';
import { throwIfEmpty } from 'rxjs';
import { CompanyService } from '../company/company.service';

@Injectable()
export class BinLocationService {
  constructor(
    @InjectRepository(BinLocation) private repository: Repository<BinLocation>,
    private companyService: CompanyService,
  ) {}

  async createBinLocation(
    binLocationDTO: BinLocationDTO,
    companyUid?: string,
  ): Promise<BinLocation> {
    try {
      const binLocation = this.getBinLocationFromDTO(binLocationDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || binLocationDTO.companyId,
      );
      binLocation.company = company;
      return await binLocation.save();
    } catch (e) {
      console.error('Failed to create bin location', e);
      throw e;
    }
  }

  async saveBinLocation(
    binLocationDTO: BinLocationDTO,
    companyUid,
  ): Promise<BinLocation> {
    try {
      const refBinLocation = await this.getBinLocationByUID(binLocationDTO.id);
      if (!refBinLocation) {
        await this.createBinLocation(binLocationDTO, companyUid);
      } else {
        const binLocationPayload = this.getBinLocationFromDTO(
          binLocationDTO,
          refBinLocation,
        );
        return await binLocationPayload.save();
      }
    } catch (e) {
      console.error('Failed to save bin location', e);
      throw e;
    }
  }

  async getBinLocationByUID(uid: string): Promise<BinLocation> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get bin location by UID');
      throw e;
    }
  }

  async getBinLocations(companyUid): Promise<BinLocationDTO[]> {
    try {
      const binLocations = await this.repository.find({
        where: { company: { uid: companyUid } },
      });
      return binLocations.map((binLocation) =>
        this.getBinLocationDTOFromBinLocation(binLocation),
      );
    } catch (e) {
      console.error('Failed to get bin locations', e);
      throw e;
    }
  }

  getBinLocationFromDTO(
    binLocationDTO: BinLocationDTO,
    binLocation = new BinLocation(),
  ): BinLocation {
    binLocation.uid = binLocationDTO.id;
    binLocation.name = binLocationDTO.name;
    binLocation.description = binLocationDTO.description;
    return binLocation;
  }

  getBinLocationDTOFromBinLocation(binLocation: BinLocation): BinLocationDTO {
    return {
      id: binLocation.uid,
      name: binLocation.name,
      description: binLocation.description,
      companyId: binLocation?.company?.uid,
    };
  }
}
