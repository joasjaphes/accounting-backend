import { AccountController } from 'src/app/account/account.controller';
import { CompanyController } from 'src/app/company/company.controller';
import { CustomerController } from 'src/app/customer/customer.controller';
import { InvoiceController } from 'src/app/invoice/invoice.controller';
import { JournalEntryController } from 'src/app/journal-entry/journal-entry.controller';
import { ProductController } from 'src/app/product/product.controller';
import { UserController } from 'src/app/user/user.controller';

export const controllers = [
  CompanyController,
  UserController,
  AccountController,
  JournalEntryController,
  ProductController,
  CustomerController,
  InvoiceController,
];
