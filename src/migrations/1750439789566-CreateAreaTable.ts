import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAreaTable1718901234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // PostGIS uzantısı yüklü mü emin ol
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis;`);

    await queryRunner.query(`
      CREATE TABLE "area" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR NOT NULL,
        "polygon" geometry(POLYGON, 4326) NOT NULL,
        "created_at" TIMESTAMP DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "area";`);
  }
}
