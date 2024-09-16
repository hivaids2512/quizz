import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1726496288971 implements MigrationInterface {
    name = 'AddIndex1726496288971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_score" ADD CONSTRAINT "UQ_5c0bb96d41998b5622a4919e4fe" UNIQUE ("quizId", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_score" DROP CONSTRAINT "UQ_5c0bb96d41998b5622a4919e4fe"`);
    }

}
