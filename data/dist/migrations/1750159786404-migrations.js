"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1750159786404 = void 0;
class Migrations1750159786404 {
    name = 'Migrations1750159786404';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df"`);
        await queryRunner.query(`ALTER TABLE "department_entity" ADD CONSTRAINT "UQ_d29774bf63d985dff8ca63f1bfa" UNIQUE ("deptno")`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ADD CONSTRAINT "UQ_2c1586930ac725d217431a67e9b" UNIQUE ("empno")`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df" FOREIGN KEY ("dept") REFERENCES "department_entity"("deptno") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "employee_entity" DROP CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" DROP CONSTRAINT "UQ_2c1586930ac725d217431a67e9b"`);
        await queryRunner.query(`ALTER TABLE "department_entity" DROP CONSTRAINT "UQ_d29774bf63d985dff8ca63f1bfa"`);
        await queryRunner.query(`ALTER TABLE "employee_entity" ADD CONSTRAINT "FK_d7625c4c6a2ee51743ff10b63df" FOREIGN KEY ("dept") REFERENCES "department_entity"("deptno") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.Migrations1750159786404 = Migrations1750159786404;
//# sourceMappingURL=1750159786404-migrations.js.map