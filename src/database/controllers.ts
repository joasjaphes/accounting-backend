import { AccountController } from 'src/app/account/account.controller';
import { CompanyController } from 'src/app/company/company.controller';
import { CurrencyController } from 'src/app/currency/currency.controller';
import { CustomerController } from 'src/app/customer/customer.controller';
import { FinancialPeriodController } from 'src/app/financial-period/financial-period.controller';
import { InvoiceController } from 'src/app/invoice/invoice.controller';
import { JournalEntryController } from 'src/app/journal-entry/journal-entry.controller';
import { PaymentTypeController } from 'src/app/payment-type/payment-type.controller';
import { ProductController } from 'src/app/product/product.controller';
import { StoreController } from 'src/app/store/store.controller';
import { TaxCodeController } from 'src/app/tax-code/tax-code.controller';
import { UserController } from 'src/app/user/user.controller';

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
];
