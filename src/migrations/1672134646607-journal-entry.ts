import { MigrationInterface, QueryRunner } from 'typeorm';

export class journalEntry1672134646607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('RUNNING MIGRATION')
    await queryRunner.query(`CREATE TABLE journal_entry`);
    await queryRunner.query(`ALTER TABLE journal_entry ADD COLLUMN debits STRING`)
    await queryRunner.query(`ALTER TABLE journal_entry ADD COLLUMN credits STRING`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 
  }
}
