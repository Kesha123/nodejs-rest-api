import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740574090341 implements MigrationInterface {
  name = 'Migration1740574090341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_46f4182c2bb2426c97d77889d08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" RENAME COLUMN "deptDeptno" TO "dept"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ALTER COLUMN "dept" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df" FOREIGN KEY ("dept") REFERENCES "department_entity"("deptno") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ALTER COLUMN "dept" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" RENAME COLUMN "dept" TO "deptDeptno"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_46f4182c2bb2426c97d77889d08" FOREIGN KEY ("deptDeptno") REFERENCES "department_entity"("deptno") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
