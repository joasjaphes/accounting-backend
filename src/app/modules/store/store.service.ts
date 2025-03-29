import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { StoreDTO } from './store.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private repository: Repository<Store>,
    private companyService: CompanyService,
  ) {}

  async createStore(storeDTO: StoreDTO, companyUid?: string) {
    try {
      const store = this.getStoreFromDTO(storeDTO);
      const company = await this.companyService.findCompanyByUid(
        companyUid || storeDTO.companyId,
      );
      store.company = company;
      return await store.save();
    } catch (e) {
      console.error('Failed to save store', e);
      throw e;
    }
  }

  async saveStore(storeDTO: StoreDTO, companyUid?: string) {
    try {
      const refStore = await this.findStoreByUid(storeDTO.id);
      if (!refStore) {
        await this.createStore(storeDTO, companyUid);
      } else {
        refStore.name = storeDTO.name;
        refStore.description = storeDTO.description;
        refStore.canRequestFromOtherStores = storeDTO.canRequestFromOtherStores;
        refStore.allowSales = storeDTO.allowSales;
        refStore.canIssueToOtherStores = storeDTO.canIssueToOtherStores;
        refStore.canReceivePurchaseOrder = storeDTO.canReceivePurchaseOrder;
        return await refStore.save();
      }
    } catch (e) {
      console.error('Failed to update store', e);
      throw e;
    }
  }

  async getStores(companyUid: string) {
    try {
      const stores = await this.repository.find({
        where: { company: { uid: companyUid } },
      });
      return stores.map((store) => this.getStoreDTOFromStore(store));
    } catch (e) {
      console.error('Failed to get stores', e);
      throw e;
    }
  }

  async findStoreByUid(uid: string): Promise<Store> {
    try {
      return await this.repository.findOne({ where: { uid } });
    } catch (e) {
      console.error('Failed to get store', e);
    }
  }

  getStoreFromDTO(storeDTO: StoreDTO): Store {
    const store = new Store();
    store.uid = storeDTO.id;
    store.name = storeDTO.name;
    store.description = storeDTO.description;
    store.canRequestFromOtherStores = storeDTO.canRequestFromOtherStores;
    store.allowSales = storeDTO.allowSales;
    store.canIssueToOtherStores = storeDTO.canIssueToOtherStores;
    store.canReceivePurchaseOrder = storeDTO.canReceivePurchaseOrder;
    return store;
  }

  getStoreDTOFromStore(store: Store): StoreDTO {
    return {
      id: store.uid,
      name: store.name,
      description: store.description,
      canRequestFromOtherStores: store.canRequestFromOtherStores,
      allowSales: store.allowSales,
      canIssueToOtherStores: store.canIssueToOtherStores,
      canReceivePurchaseOrder: store.canReceivePurchaseOrder,
    };
  }
}
