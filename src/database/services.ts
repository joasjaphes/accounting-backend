import { AccountService } from 'src/app/modules/account/account.service';
import { BinLocationService } from 'src/app/modules/bin-location/bin-location.service';
import { CompanyService } from 'src/app/modules/company/company.service';
import { CurrencyService } from 'src/app/modules/currency/currency.service';
import { CustomerService } from 'src/app/modules/customer/customer.service';
import { FinancialPeriodService } from 'src/app/modules/financial-period/financial-period.service';
import { InvoiceService } from 'src/app/modules/invoice/invoice.service';
import { JournalEntryService } from 'src/app/modules/journal-entry/journal-entry.service';
import { PackagingService } from 'src/app/modules/packaging/packaging.service';
import { PaymentTypeService } from 'src/app/modules/payment-type/payment-type.service';
import { PriceCategoryService } from 'src/app/modules/price-category/price-category.service';
import { ProductCategoryService } from 'src/app/modules/product-category/product-category.service';
import { StoreService } from 'src/app/modules/store/store.service';
import { TaxCodeService } from 'src/app/modules/tax-code/tax-code.service';
import { TransactionService } from 'src/app/modules/transactions/transaction.service';
import { UserService } from 'src/app/modules/user/user.service';

export const services = [
  CompanyService,
  UserService,
  AccountService,
  TransactionService,
  JournalEntryService,
  CustomerService,
  InvoiceService,
  StoreService,
  CurrencyService,
  PaymentTypeService,
  TaxCodeService,
  FinancialPeriodService,
  ProductCategoryService,
  PackagingService,
  BinLocationService,
  PriceCategoryService,
];
