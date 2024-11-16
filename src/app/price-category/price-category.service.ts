import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceCategory } from './price-category.entity';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { PriceCategoryDTO } from './price-category.dto';

@Injectable()
export class PriceCategoryService {
  constructor(
    @InjectRepository(PriceCategory)
    private repository: Repository<PriceCategory>,
    private companyService: CompanyService,
  ) {}

  async createPriceCategory(priceCategoryDTO: PriceCategoryDTO) {
    try {
      const priceCategory = this.getPriceCategoryFromDTO(priceCategoryDTO);
      const company = await this.companyService.findCompanyByUid(
        priceCategoryDTO.companyId,
      );
      priceCategory.company = company;
      return await priceCategory.save();
    } catch (e) {
      console.error('Failed to create price category', e);
      throw e;
    }
  }

  async savePriceCategory(priceCategoryDTO: PriceCategoryDTO) {
    try {
      const refPriceCategory = await this.findPriceCategoryByUID(
        priceCategoryDTO.id,
      );
      if (!refPriceCategory) {
        await this.createPriceCategory(priceCategoryDTO);
      } else {
        const payload = this.getPriceCategoryFromDTO(
          priceCategoryDTO,
          refPriceCategory,
        );
        return await payload.save();
      }
    } catch (e) {
      console.error('Failed to save price category', e);
      throw e;
    }
  }

  async findPriceCategoryByUID(uid: string) {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get price category by UID');
    }
  }

  async getPriceCategories() {
    try {
      const priceCategories = await this.repository.find();
      return priceCategories.map((priceCategory) =>
        this.getPriceCategoryDTOFromPriceCategory(priceCategory),
      );
    } catch (e) {
      console.error('Failed to get price categories');
    }
  }

  getPriceCategoryFromDTO(
    priceCategoryDTO: PriceCategoryDTO,
    priceCategory = new PriceCategory(),
  ) {
    priceCategory.name = priceCategoryDTO.name;
    priceCategory.description = priceCategoryDTO.description;
    priceCategory.profitMargin = priceCategoryDTO.profitMargin;
    priceCategory.isDefault = priceCategoryDTO.isDefault;
    priceCategory.status = priceCategoryDTO.status;
    return priceCategory;
  }

  getPriceCategoryDTOFromPriceCategory(priceCategory: PriceCategory) {
    return {
      id: priceCategory.uid,
      name: priceCategory.name,
      description: priceCategory.description,
      profitMargin: priceCategory.profitMargin,
      isDefault: priceCategory.isDefault,
      status: priceCategory.status,
    };
  }
}
