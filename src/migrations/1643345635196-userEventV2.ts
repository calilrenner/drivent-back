import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEventV21643345635196 implements MigrationInterface {
    name = 'userEventV21643345635196';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "events" DROP COLUMN "beginHour"');
        await queryRunner.query(
            'ALTER TABLE "events" ADD "beginHour" numeric(5,2) NOT NULL DEFAULT \'0\'',
        );
        await queryRunner.query('ALTER TABLE "events" DROP COLUMN "finalHour"');
        await queryRunner.query(
            'ALTER TABLE "events" ADD "finalHour" numeric(5,2) NOT NULL DEFAULT \'0\'',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "events" DROP COLUMN "finalHour"');
        await queryRunner.query(
            'ALTER TABLE "events" ADD "finalHour" integer NOT NULL',
        );
        await queryRunner.query('ALTER TABLE "events" DROP COLUMN "beginHour"');
        await queryRunner.query(
            'ALTER TABLE "events" ADD "beginHour" integer NOT NULL',
        );
    }
}
