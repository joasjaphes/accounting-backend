import { AccountController } from 'src/app/modules/account/account.controller';
import { BinLocationController } from 'src/app/modules/bin-location/bin-location.controller';
import { CompanyController } from 'src/app/modules/company/company.controller';
import { CurrencyController } from 'src/app/modules/currency/currency.controller';
import { CustomerController } from 'src/app/modules/customer/customer.controller';
import { FileController } from 'src/app/modules/file-uploader/file.controller';
import { FinancialPeriodController } from 'src/app/modules/financial-period/financial-period.controller';
import { InvoiceController } from 'src/app/modules/invoice/invoice.controller';
import { JournalEntryController } from 'src/app/modules/journal-entry/journal-entry.controller';
import { PackagingController } from 'src/app/modules/packaging/packaging.controller';
import { PaymentTypeController } from 'src/app/modules/payment-type/payment-type.controller';
import { PriceCategoryController } from 'src/app/modules/price-category/price-category.controller';
import { ProductCategoryController } from 'src/app/modules/product-category/prodyct-category.controller';
import { ProductController } from 'src/app/modules/product/product.controller';
import { StoreController } from 'src/app/modules/store/store.controller';
import { TaxCodeController } from 'src/app/modules/tax-code/tax-code.controller';
import { UserController } from 'src/app/modules/user/user.controller';

export const controllers = [
  CompanyController,
  UserController,
  AccountController,
  JournalEntryController,
  ProductController,
  CustomerController,
  InvoiceController,
  StoreController,
  CurrencyController,
  PaymentTypeController,
  TaxCodeController,
  FinancialPeriodController,
  ProductCategoryController,
  PackagingController,
  BinLocationController,
  PriceCategoryController,
  FileController,
];
