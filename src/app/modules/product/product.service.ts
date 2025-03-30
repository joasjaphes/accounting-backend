import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';
import { CompanyService } from '../company/company.service';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private companyService: CompanyService,
  ) {}

  async createProduct(
    product: ProductDTO,
    currentUser: User,
    companyUid?: string,
  ) {
    try {
      const payload = this.getProductPayloadFromDTO(product);
      const company = await this.companyService.findCompanyByUid(
        companyUid || product.companyId,
      );
      payload.company = company;
      payload.createdBy = currentUser;
      payload.updatedBy = currentUser;
      return await payload.save();
    } catch (e) {
      throw e;
    }
  }

  async saveProduct(
    product: ProductDTO,
    currentUser: User,
    companyUid: string,
  ) {
    try {
      const refProduct = await this.findProductByUid(product.id);
      if (!refProduct) {
        await this.createProduct(product, currentUser, companyUid);
      } else {
        const payload = this.getProductPayloadFromDTO(product, refProduct);
        payload.updatedBy = currentUser;
        return await payload.save();
      }
    } catch (e) {
      throw e;
    }
  }

  async getProducts(companyUid): Promise<ProductDTO[]> {
    try {
      const products = await this.repository.find({
        where: { company: { uid: companyUid } },
      });
      return products.map((product) => this.getProductDTOFromEntity(product));
    } catch (e) {
      throw e;
    }
  }

  async findProductByUid(uid: string): Promise<Product> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      throw e;
    }
  }
  getProductDTOFromEntity(product: Product): ProductDTO {
    return {
      id: product.uid,
      name: product.name,
      description: product.description,
      type: product.type,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  }

  getProductPayloadFromDTO(
    product: ProductDTO,
    newProduct = new Product(),
  ): Product {
    newProduct.uid = product.id;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.type = product.type;
    newProduct.price = product.price ?? 0;
    newProduct.imageUrl = product.imageUrl;
    return newProduct;
  }
}
