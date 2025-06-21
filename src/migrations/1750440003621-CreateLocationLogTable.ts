import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocationLogTable1750440003621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "location_log" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" VARCHAR NOT NULL,
        "area_id" uuid NOT NULL,
        "timestamp" TIMESTAMP DEFAULT now(),
        CONSTRAINT "fk_location_log_area" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "location_log";`);
  }
}
