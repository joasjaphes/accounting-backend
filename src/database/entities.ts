import { Account } from 'src/app/modules/account/account.entity';
import { BinLocation } from 'src/app/modules/bin-location/bin-location.entity';
import { Company } from 'src/app/modules/company/company.entity';
import { Currency } from 'src/app/modules/currency/currency.entity';
import { Customer } from 'src/app/modules/customer/customer.entity';
import { FinancialPeriod } from 'src/app/modules/financial-period/financial-period.entity';
import { InvoiceItem } from 'src/app/modules/invoice/invoice-item.entity';
import { Invoice } from 'src/app/modules/invoice/invoice.entity';
import { JournalEntry } from 'src/app/modules/journal-entry/journal-entry.entity';
import { Packaging } from 'src/app/modules/packaging/packaging.entity';
import { PaymentType } from 'src/app/modules/payment-type/payment-type.entity';
import { PriceCategory } from 'src/app/modules/price-category/price-category.entity';
import { ProductCategory } from 'src/app/modules/product-category/product-category.entity';
import { Product } from 'src/app/modules/product/product.entity';
import { Store } from 'src/app/modules/store/store.entity';
import { TaxCode } from 'src/app/modules/tax-code/tax-code.entity';
import { TransactionEntity } from 'src/app/modules/transactions/transaction.entity';
import { User } from 'src/app/modules/user/user.entity';

export const entities = [
  Company,
  User,
  Account,
  TransactionEntity,
  JournalEntry,
  Product,
  Customer,
  InvoiceItem,
  Invoice,
  Currency,
  Store,
  PaymentType,
  TaxCode,
  FinancialPeriod,
  ProductCategory,
  Packaging,
  BinLocation,
  PriceCategory,
];
