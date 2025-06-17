import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1750159786404 implements MigrationInterface {
  name = 'Migrations1750159786404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_entity" ADD CONSTRAINT "UQ_d29774bf63d985dff8ca63f1bfa" UNIQUE ("deptno")`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ADD CONSTRAINT "UQ_2c1586930ac725d217431a67e9b" UNIQUE ("empno")`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df" FOREIGN KEY ("dept") REFERENCES "department_entity"("deptno") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" DROP CONSTRAINT "UQ_2c1586930ac725d217431a67e9b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_entity" DROP CONSTRAINT "UQ_d29774bf63d985dff8ca63f1bfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df" FOREIGN KEY ("dept") REFERENCES "department_entity"("deptno") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
