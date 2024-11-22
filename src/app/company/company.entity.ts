import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Account } from '../account/account.entity';
import { TransactionEntity } from '../transactions/transaction.entity';
import { Currency } from '../currency/currency.entity';
import { Store } from '../store/store.entity';
import { PaymentType } from '../payment-type/payment-type.entity';
import { TaxCode } from '../tax-code/tax-code.entity';
import { FinancialPeriod } from '../financial-period/financial-period.entity';
import { ProductCategory } from '../product-category/product-category.entity';
import { Packaging } from '../packaging/packaging.entity';
import { BinLocation } from '../bin-location/bin-location.entity';
import { PriceCategory } from '../price-category/price-category.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 11, unique: true, nullable: false })
  uid: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  address: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  TIN: string;
  @Column({ nullable: true })
  VRN: string;
  @Column({ nullable: true, default: 'OLD_COST' })
  costUpdateMethod: string;
  @Column({ nullable: true, default: false })
  forceAccounting: boolean;
  @Column({ nullable: true })
  logo: string;
  @Column({ nullable: true })
  efdSettings: string;
  @OneToMany(() => User, (user) => user.company)
  users: User[];
  @OneToMany(() => Account, (account) => account.company)
  accounts: Account[];
  @OneToMany(() => TransactionEntity, (transaction) => transaction.company)
  transactions: TransactionEntity[];
  @OneToMany(() => Currency, (currency) => currency.company)
  currencies: Currency[];
  @OneToMany(() => Store, (store) => store.company)
  stores: Store[];
  @OneToMany(() => PaymentType, (paymentType) => paymentType.company)
  paymentTypes: PaymentType[];
  @OneToMany(() => TaxCode, (taxCode) => taxCode.company)
  taxCodes: TaxCode[];
  @OneToMany(
    () => FinancialPeriod,
    (financialPeriod) => financialPeriod.company,
  )
  financialPeriods: FinancialPeriod[];
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.company,
  )
  productCategories: ProductCategory[];
  @OneToMany(() => Packaging, (packaging) => packaging.company)
  packagings: Packaging[];
  @OneToMany(() => BinLocation, (binLocation) => binLocation.company)
  binLocations: BinLocation[];
  @OneToMany(() => PriceCategory, (priceCategory) => priceCategory.company)
  priceCategories: PriceCategory[];
}
