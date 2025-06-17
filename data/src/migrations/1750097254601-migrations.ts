import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1750097254601 implements MigrationInterface {
  name = 'Migrations1750097254601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "department_entity" ("deptno" SERIAL NOT NULL, "dname" character varying(14), "loc" character varying(13), CONSTRAINT "UQ_d29774bf63d985dff8ca63f1bfa" UNIQUE ("deptno"), CONSTRAINT "PK_d29774bf63d985dff8ca63f1bfa" PRIMARY KEY ("deptno"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_entity" ("empno" SERIAL NOT NULL, "ename" character varying(10) NOT NULL, "job" character varying(9) NOT NULL, "mgr" integer, "hiredate" TIMESTAMP NOT NULL, "sal" numeric(7,2) NOT NULL, "comm" numeric(7,2), "dept" integer, CONSTRAINT "UQ_2c1586930ac725d217431a67e9b" UNIQUE ("empno"), CONSTRAINT "PK_2c1586930ac725d217431a67e9b" PRIMARY KEY ("empno"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df" FOREIGN KEY ("dept") REFERENCES "department_entity"("deptno") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df"`,
    );
    await queryRunner.query(`DROP TABLE "employee_entity"`);
    await queryRunner.query(`DROP TABLE "department_entity"`);
  }
}
