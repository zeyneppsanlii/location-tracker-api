import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocationTable1750439943251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "location" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" VARCHAR NOT NULL,
        "coordinates" geometry(POINT, 4326) NOT NULL,
        "created_at" TIMESTAMP DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "location";`);
  }
}
