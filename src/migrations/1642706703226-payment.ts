import { MigrationInterface, QueryRunner } from 'typeorm';

export class payment1642706703226 implements MigrationInterface {
    name = 'payment1642706703226';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "modalities" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_4135bf3c2e5bb971c20b08bbef1" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "users_tickets" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "acommodationId" integer NOT NULL, "modalityId" integer NOT NULL, CONSTRAINT "PK_9f33a7d082c75ea8ba55fbac2a7" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "acommodations" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_f14af016c1a4e634584425bc624" PRIMARY KEY ("id"))',
        );
        await queryRunner.query('ALTER TABLE "users" ADD "user_id" integer');
        await queryRunner.query(
            'ALTER TABLE "users" ADD CONSTRAINT "UQ_96aac72f1574b88752e9fb00089" UNIQUE ("user_id")',
        );
        await queryRunner.query(
            'ALTER TABLE "addresses" DROP CONSTRAINT "FK_1ce5592b8fd5529a35fb9fe1460"',
        );
        await queryRunner.query(
            'ALTER TABLE "addresses" ADD CONSTRAINT "UQ_1ce5592b8fd5529a35fb9fe1460" UNIQUE ("enrollmentId")',
        );
        await queryRunner.query(
            'ALTER TABLE "users_tickets" ADD CONSTRAINT "FK_be414e3bcfebc5a76228a9fb62e" FOREIGN KEY ("acommodationId") REFERENCES "acommodations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "users_tickets" ADD CONSTRAINT "FK_33e0e9d3e2e8a6092e6d3f8eb04" FOREIGN KEY ("modalityId") REFERENCES "modalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "addresses" ADD CONSTRAINT "FK_1ce5592b8fd5529a35fb9fe1460" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "users" ADD CONSTRAINT "FK_96aac72f1574b88752e9fb00089" FOREIGN KEY ("user_id") REFERENCES "users_tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "users" DROP CONSTRAINT "FK_96aac72f1574b88752e9fb00089"',
        );
        await queryRunner.query(
            'ALTER TABLE "addresses" DROP CONSTRAINT "FK_1ce5592b8fd5529a35fb9fe1460"',
        );
        await queryRunner.query(
            'ALTER TABLE "users_tickets" DROP CONSTRAINT "FK_33e0e9d3e2e8a6092e6d3f8eb04"',
        );
        await queryRunner.query(
            'ALTER TABLE "users_tickets" DROP CONSTRAINT "FK_be414e3bcfebc5a76228a9fb62e"',
        );
        await queryRunner.query(
            'ALTER TABLE "addresses" DROP CONSTRAINT "UQ_1ce5592b8fd5529a35fb9fe1460"',
        );
        await queryRunner.query(
            'ALTER TABLE "addresses" ADD CONSTRAINT "FK_1ce5592b8fd5529a35fb9fe1460" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "users" DROP CONSTRAINT "UQ_96aac72f1574b88752e9fb00089"',
        );
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "user_id"');
        await queryRunner.query('DROP TABLE "acommodations"');
        await queryRunner.query('DROP TABLE "users_tickets"');
        await queryRunner.query('DROP TABLE "modalities"');
    }
}
