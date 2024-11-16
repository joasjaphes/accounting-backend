import { Account } from 'src/app/account/account.entity';
import { BinLocation } from 'src/app/bin-location/bin-location.entity';
import { Company } from 'src/app/company/company.entity';
import { Currency } from 'src/app/currency/currency.entity';
import { Customer } from 'src/app/customer/customer.entity';
import { FinancialPeriod } from 'src/app/financial-period/financial-period.entity';
import { InvoiceItem } from 'src/app/invoice/invoice-item.entity';
import { Invoice } from 'src/app/invoice/invoice.entity';
import { JournalEntry } from 'src/app/journal-entry/journal-entry.entity';
import { Packaging } from 'src/app/packaging/packaging.entity';
import { PaymentType } from 'src/app/payment-type/payment-type.entity';
import { PriceCategory } from 'src/app/price-category/price-category.entity';
import { ProductCategory } from 'src/app/product-category/product-category.entity';
import { Product } from 'src/app/product/product.entity';
import { Store } from 'src/app/store/store.entity';
import { TaxCode } from 'src/app/tax-code/tax-code.entity';
import { TransactionEntity } from 'src/app/transactions/transaction.entity';
import { User } from 'src/app/user/user.entity';

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
