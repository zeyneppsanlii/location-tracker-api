import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTimestampToCreatedAtInLocationLog1750540275188
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "location_log" RENAME COLUMN "timestamp" TO "created_at";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "location_log" RENAME COLUMN "created_at" TO "timestamp";
    `);
  }
}
