import { BadGatewayException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { JournalAccount } from '../entities/journal-account.entity';

@EntityRepository(JournalAccount)
export class JournalAccountRepository extends Repository<JournalAccount> {
  async saveJournalAccount(journalAccount: JournalAccount) {
    try {
      const ref = await this.findOne({ uid: journalAccount.uid });
      if (ref) {
        return await this.update({ id: ref.id }, journalAccount);
      }
      return await this.save(journalAccount);
    } catch (e) {
      throw new BadGatewayException();
    }
  }
}
