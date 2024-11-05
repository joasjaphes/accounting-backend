import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { StoreDTO } from './store.dto';

@Injectable()
export class StoreService {
  constructor(@InjectRepository(Store) private repository: Repository<Store>) {}

  async createStore(storeDTO: StoreDTO) {
    try {
      const store = this.getStoreFromDTO(storeDTO);
      return await store.save();
    } catch (e) {
      console.error('Failed to save store', e);
      throw e;
    }
  }

  async updateStore(storeDTO: StoreDTO) {
    try {
      const refStore = await this.findStoreByUid(storeDTO.id);
      if (!refStore) {
        throw new NotFoundException();
      }
      refStore.name = storeDTO.name;
      refStore.description = storeDTO.description;
      refStore.canRequestFromOtherStores = storeDTO.canRequestFromOtherStores;
      refStore.allowSales = storeDTO.allowSales;
      refStore.canIssueToOtherStores = storeDTO.canIssueToOtherStores;
      refStore.canReceivePurchaseOrder = storeDTO.canReceivePurchaseOrder;
      refStore.companyId = storeDTO.companyId;
      return await refStore.save();
    } catch (e) {
      console.error('Failed to update store', e);
      throw e;
    }
  }

  async getStores() {
    try {
      const stores = await this.repository.find();
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
    store.companyId = storeDTO.companyId;
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
      companyId: store.companyId,
    };
  }
}
