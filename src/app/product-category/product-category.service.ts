import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './product-category.entity';
import { Repository } from 'typeorm';
import { ProductCategoryDTO } from './product-category.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private repository: Repository<ProductCategory>,
    private companyService: CompanyService,
  ) {}

  async createProductCategory(
    productCategoryDTO: ProductCategoryDTO,
    companyUid?: string,
  ) {
    try {
      const productCategory =
        this.getProductCategoryFromDTO(productCategoryDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || productCategoryDTO.companyId,
      );
      productCategory.company = company;
      return await productCategory.save();
    } catch (e) {
      console.error('Failed to create product category', e);
      throw e;
    }
  }

  async saveProductCategory(
    productCategoryDTO: ProductCategoryDTO,
    companyUid?: string,
  ) {
    try {
      const refProductCategory = await this.findProductCategoryByUID(
        productCategoryDTO.id,
      );
      if (!refProductCategory) {
        await this.createProductCategory(productCategoryDTO, companyUid);
      } else {
        refProductCategory.name = productCategoryDTO.name;
        refProductCategory.description = productCategoryDTO.description;
        refProductCategory.COGSAccount = productCategoryDTO.COGSAccount;
        refProductCategory.inventoryAccount =
          productCategoryDTO.inventoryAccount;
        refProductCategory.purchasingTax = productCategoryDTO.purchasingTax;
        refProductCategory.salesAccount = productCategoryDTO.salesAccount;
        refProductCategory.salesTax = productCategoryDTO.salesTax;
        return await refProductCategory.save();
      }
    } catch (e) {
      console.error('Failed to save product category', e);
      throw e;
    }
  }

  async getProductCategories() {
    try {
      const productCategories = await this.repository.find();
      return productCategories.map((productCategory) =>
        this.getDTOFromProductCategory(productCategory),
      );
    } catch (e) {
      console.error('Failed to get product categories', e);
      throw e;
    }
  }

  async findProductCategoryByUID(uid: string): Promise<ProductCategory> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get product category', e);
    }
  }

  getProductCategoryFromDTO(
    productCategoryDTO: ProductCategoryDTO,
  ): ProductCategory {
    const productCategory = new ProductCategory();
    productCategory.uid = productCategoryDTO.id;
    productCategory.name = productCategoryDTO.name;
    productCategory.salesTax = productCategoryDTO.salesTax;
    productCategory.purchasingTax = productCategoryDTO.purchasingTax;
    productCategory.COGSAccount = productCategoryDTO.COGSAccount;
    productCategory.inventoryAccount = productCategoryDTO.inventoryAccount;
    productCategory.salesAccount = productCategoryDTO.salesAccount;
    return productCategory;
  }

  getDTOFromProductCategory(
    productCategory: ProductCategory,
  ): ProductCategoryDTO {
    return {
      id: productCategory.uid,
      name: productCategory.name,
      description: productCategory.description,
      salesTax: productCategory.salesTax,
      purchasingTax: productCategory.purchasingTax,
      COGSAccount: productCategory.COGSAccount,
      inventoryAccount: productCategory.inventoryAccount,
      salesAccount: productCategory.salesAccount,
    };
  }
}
