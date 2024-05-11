import { AccountController } from 'src/app/account/account.controller';
import { CompanyController } from 'src/app/company/company.controller';
import { JournalEntryController } from 'src/app/journal-entry/journal-entry.controller';
import { UserController } from 'src/app/user/user.controller';

export const controllers = [
  CompanyController,
  UserController,
  AccountController,
  JournalEntryController,
];
