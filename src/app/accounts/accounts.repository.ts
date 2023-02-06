import { EntityRepository, Repository } from 'typeorm';
import { Account } from './accounts.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async saveAccount(accountPpayload: Account) {
    const ref = await this.findOne({ where: { uid: accountPpayload.uid } });
    console.log('ref', ref);
    if (ref) {
      await this.update({ id: ref.id }, accountPpayload);
      return accountPpayload;
    } else {
      return await accountPpayload.save();
    }
  }

  async getAllAccounts() {
    return await this.find();
  }
}
