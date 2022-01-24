import { MigrationInterface, QueryRunner } from 'typeorm';

export class hotels1642890652979 implements MigrationInterface {
    name = 'hotels1642890652979';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "vacancies" ("id" SERIAL NOT NULL, "is_available" boolean NOT NULL, "roomId" integer, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "hotelId" integer, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "hotels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "accommodation_type" character varying NOT NULL, "image_url" character varying NOT NULL, "vacancies" integer NOT NULL, CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "vacancies_users" ("id" SERIAL NOT NULL, "vacancyId" integer, "userId" integer, CONSTRAINT "REL_4ce5dc9183ac6ad4ac811ba220" UNIQUE ("vacancyId"), CONSTRAINT "REL_ee365b9ec9a475a02e2a46b54e" UNIQUE ("userId"), CONSTRAINT "PK_17262aab8dba723f1e0087fcfc1" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'ALTER TABLE "vacancies" ADD CONSTRAINT "FK_6112290bf56c2c7d40721fc85cc" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "rooms" ADD CONSTRAINT "FK_e9d4d68c8c47b7fe47b8e233f60" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "vacancies_users" ADD CONSTRAINT "FK_4ce5dc9183ac6ad4ac811ba2205" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "vacancies_users" ADD CONSTRAINT "FK_ee365b9ec9a475a02e2a46b54e1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "vacancies_users" DROP CONSTRAINT "FK_ee365b9ec9a475a02e2a46b54e1"',
        );
        await queryRunner.query(
            'ALTER TABLE "vacancies_users" DROP CONSTRAINT "FK_4ce5dc9183ac6ad4ac811ba2205"',
        );
        await queryRunner.query(
            'ALTER TABLE "rooms" DROP CONSTRAINT "FK_e9d4d68c8c47b7fe47b8e233f60"',
        );
        await queryRunner.query(
            'ALTER TABLE "vacancies" DROP CONSTRAINT "FK_6112290bf56c2c7d40721fc85cc"',
        );
        await queryRunner.query('DROP TABLE "vacancies_users"');
        await queryRunner.query('DROP TABLE "hotels"');
        await queryRunner.query('DROP TABLE "rooms"');
        await queryRunner.query('DROP TABLE "vacancies"');
    }
}
