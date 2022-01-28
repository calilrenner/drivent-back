import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEvent1643311775851 implements MigrationInterface {
    name = 'userEvent1643311775851';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "trails" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b3f5fcb70ca142a3087a0736bbb" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "user_events" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_22f49067e87f2c8a3fff76543d1" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "trailId" integer NOT NULL, "beginHour" integer NOT NULL, "finalHour" integer NOT NULL, "dayId" integer NOT NULL, "vacancies" integer NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'CREATE TABLE "days" ("id" SERIAL NOT NULL, "day" character varying NOT NULL, CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id"))',
        );
        await queryRunner.query(
            'ALTER TABLE "user_events" ADD CONSTRAINT "FK_63cb9d79f7be87efc6efc72a6ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "user_events" ADD CONSTRAINT "FK_cdc20a262881171de056ae2e5aa" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "events" ADD CONSTRAINT "FK_1bcce2a18306dd6510e06085864" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE "events" ADD CONSTRAINT "FK_15f96139171eb6aac8d0b481bf2" FOREIGN KEY ("trailId") REFERENCES "trails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "events" DROP CONSTRAINT "FK_15f96139171eb6aac8d0b481bf2"',
        );
        await queryRunner.query(
            'ALTER TABLE "events" DROP CONSTRAINT "FK_1bcce2a18306dd6510e06085864"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_events" DROP CONSTRAINT "FK_cdc20a262881171de056ae2e5aa"',
        );
        await queryRunner.query(
            'ALTER TABLE "user_events" DROP CONSTRAINT "FK_63cb9d79f7be87efc6efc72a6ad"',
        );
        await queryRunner.query('DROP TABLE "days"');
        await queryRunner.query('DROP TABLE "events"');
        await queryRunner.query('DROP TABLE "user_events"');
        await queryRunner.query('DROP TABLE "trails"');
    }
}
