import { Account } from 'src/app/account/account.entity';
import { Company } from 'src/app/company/company.entity';
import { Customer } from 'src/app/customer/customer.entity';
import { InvoiceItem } from 'src/app/invoice/invoice-item.entity';
import { Invoice } from 'src/app/invoice/invoice.entity';
import { JournalEntry } from 'src/app/journal-entry/journal-entry.entity';
import { Product } from 'src/app/product/product.entity';
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
];
