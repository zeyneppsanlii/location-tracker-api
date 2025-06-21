import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocationIdToLocationLog1750543670663
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "location_log"
      ADD COLUMN "location_id" uuid;

      ALTER TABLE "location_log"
      ADD CONSTRAINT "fk_location_log_location"
      FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "location_log" DROP CONSTRAINT "fk_location_log_location";
      ALTER TABLE "location_log" DROP COLUMN "location_id";
    `);
  }
}
