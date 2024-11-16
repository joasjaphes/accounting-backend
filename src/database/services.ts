import { AccountService } from 'src/app/account/account.service';
import { CompanyService } from 'src/app/company/company.service';
import { CurrencyService } from 'src/app/currency/currency.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { FinancialPeriodService } from 'src/app/financial-period/financial-period.service';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { JournalEntryService } from 'src/app/journal-entry/journal-entry.service';
import { PackagingService } from 'src/app/packaging/packaging.service';
import { PaymentTypeService } from 'src/app/payment-type/payment-type.service';
import { ProductCategoryService } from 'src/app/product-category/product-category.service';
import { StoreService } from 'src/app/store/store.service';
import { TaxCodeService } from 'src/app/tax-code/tax-code.service';
import { TransactionService } from 'src/app/transactions/transaction.service';
import { UserService } from 'src/app/user/user.service';

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
];
