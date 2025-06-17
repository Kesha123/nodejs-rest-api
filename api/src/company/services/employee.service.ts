import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { EmployeeCreateDto } from '../dtos/employee/employee-create.dto';
import { EmployeePatchDto } from '../dtos/employee/employee-patch.dto';
import { EmployeePutDto } from '../dtos/employee/employee-put.dto';
import { EmployeeDto } from '../dtos/employee/employee.dto';
import {
  DepartmentEntity,
  EmployeeEntity,
} from '@kesha123/nodejs-rest-api-datasource';

@Injectable()
export class EmployeeService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Get employee by empno
   * @param {number} empno
   * @throws {NotFoundException} if employee is not found
   * @returns {Promise<EmployeeDto>}
   */
  async getEmployee(empno: number): Promise<EmployeeDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = await transactionalEntityManager.findOne(
          EmployeeEntity,
          {
            where: { empno: empno },
            relations: ['dept'],
          },
        );
        if (!employee)
          throw new NotFoundException(`Employee with empno ${empno} not found`);
        return await this.mapper.mapAsync(
          employee,
          EmployeeEntity,
          EmployeeDto,
        );
      },
    );
  }

  /**
   * Get all employees
   * @returns {Promise<EmployeeDto[]>}
   */
  async getEmployees(): Promise<EmployeeDto[]> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employees = await transactionalEntityManager.find(
          EmployeeEntity,
          {
            relations: ['dept'],
          },
        );
        return await this.mapper.mapArrayAsync(
          employees,
          EmployeeEntity,
          EmployeeDto,
        );
      },
    );
  }

  /**
   * Create employee
   * @param {EmployeeCreateDto} employeeCreateDto
   * @throws {NotFoundException} if department is not found
   * @returns {Promise<EmployeeDto>}
   */
  async createEmployee(
    employeeCreateDto: EmployeeCreateDto,
  ): Promise<EmployeeDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          {
            where: { deptno: employeeCreateDto.dept },
          },
        );
        if (!department)
          throw new NotFoundException(
            `Department with deptno ${employeeCreateDto.dept} not found`,
          );
        const employee = transactionalEntityManager.create(EmployeeEntity, {
          ...employeeCreateDto,
          dept: department,
        });
        await transactionalEntityManager.save(employee);
        return await this.mapper.mapAsync(
          employee,
          EmployeeEntity,
          EmployeeDto,
        );
      },
    );
  }

  /**
   * Update employee
   * @param {number} empno
   * @param {EmployeePutDto} employeePutDto
   * @throws {NotFoundException} if employee or department is not found
   * @returns {Promise<EmployeeDto>}
   */
  async putEmployee(
    empno: number,
    employeePutDto: EmployeePutDto,
  ): Promise<EmployeeDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = await transactionalEntityManager.findOne(
          EmployeeEntity,
          {
            where: { empno: empno },
          },
        );
        if (!employee)
          throw new NotFoundException(`Employee with empno ${empno} not found`);
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          {
            where: { deptno: employeePutDto.dept },
          },
        );
        if (!department)
          throw new NotFoundException(
            `Department with deptno ${employeePutDto.dept} not found`,
          );
        employee.ename = employeePutDto.ename;
        employee.job = employeePutDto.job;
        employee.mgr = employeePutDto.mgr;
        employee.hiredate = employeePutDto.hiredate;
        employee.sal = employeePutDto.sal;
        employee.comm = employeePutDto.comm;
        employee.dept = department;
        await transactionalEntityManager.update(
          EmployeeEntity,
          { empno: empno },
          employee,
        );
        return await this.mapper.mapAsync(
          employee,
          EmployeeEntity,
          EmployeeDto,
        );
      },
    );
  }

  /**
   * Patch employee
   * @param {number} empno
   * @param {EmployeePatchDto} employeePatchDto
   * @throws {NotFoundException} if employee or department is not found
   * @returns {Promise<EmployeeDto>}
   */
  async patchEmployee(
    empno: number,
    employeePatchDto: EmployeePatchDto,
  ): Promise<EmployeeDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = await transactionalEntityManager.findOne(
          EmployeeEntity,
          {
            where: { empno: empno },
          },
        );
        if (!employee)
          throw new NotFoundException(`Employee with empno ${empno} not found`);
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          {
            where: { deptno: employeePatchDto.dept },
          },
        );
        if (!department)
          throw new NotFoundException(
            `Department with deptno ${employeePatchDto.dept} not found`,
          );
        employee.job = employeePatchDto.job ?? employee.job;
        employee.mgr = employeePatchDto.mgr ?? employee.mgr;
        employee.sal = employeePatchDto.sal ?? employee.sal;
        employee.comm = employeePatchDto.comm ?? employee.comm;
        employee.dept = department;
        await transactionalEntityManager.update(
          EmployeeEntity,
          { empno: empno },
          employee,
        );
        return await this.mapper.mapAsync(
          employee,
          EmployeeEntity,
          EmployeeDto,
        );
      },
    );
  }

  /**
   * Delete employee
   * @param {number} empno
   * @throws {NotFoundException} if employee is not found
   */
  async deleteEmployee(empno: number): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = await transactionalEntityManager.findOne(
          EmployeeEntity,
          {
            where: { empno: empno },
          },
        );
        if (!employee)
          throw new NotFoundException(`Employee with empno ${empno} not found`);
        await transactionalEntityManager.delete(EmployeeEntity, {
          empno: empno,
        });
      },
    );
  }
}
