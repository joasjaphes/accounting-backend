import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  async saveProduct(product: ProductDTO) {
    try {
      const payload = this.getProductPayloadFromDTO(product);
      await payload.save();
    } catch (e) {
      throw e;
    }
  }

  async getProducts(): Promise<ProductDTO[]> {
    try {
      const products = await this.repository.find();
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
    };
  }

  getProductPayloadFromDTO(product: ProductDTO): Product {
    const newProduct = new Product();
    newProduct.uid = product.id;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.type = product.type;
    newProduct.price = product.price;
    return newProduct;
  }
}
