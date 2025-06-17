"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeEntity = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("./department.entity");
let EmployeeEntity = class EmployeeEntity {
    empno;
    ename;
    job;
    mgr;
    hiredate;
    sal;
    comm;
    dept;
};
exports.EmployeeEntity = EmployeeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "empno", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "ename", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 9 }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "mgr", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "hiredate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 7, scale: 2 }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "sal", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 7, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "comm", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.DepartmentEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'dept', referencedColumnName: 'deptno' }),
    __metadata("design:type", department_entity_1.DepartmentEntity)
], EmployeeEntity.prototype, "dept", void 0);
exports.EmployeeEntity = EmployeeEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['empno'])
], EmployeeEntity);
//# sourceMappingURL=employee.entity.js.map