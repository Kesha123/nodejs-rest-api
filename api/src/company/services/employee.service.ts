import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { EmployeeCreateDto } from '../dtos/employee/employee-create.dto';
import { EmployeePatchDto } from '../dtos/employee/employee-patch.dto';
import { EmployeePutDto } from '../dtos/employee/employee-put.dto';
import { EmployeeNotFoundError } from '../errors/employee-not-found.error';
import { Employee } from '../models/employee.model';
import { EmployeeDto } from '../dtos/employee/employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Get employee by empno
   * @param {number} empno
   * @returns {Promise<EmployeeDto>}
   */
  async getEmployee(empno: number): Promise<EmployeeDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = await transactionalEntityManager.findOne(
          EmployeeEntity,
          {
            where: { empno: empno },
          },
        );
        if (!employee) throw new EmployeeNotFoundError(empno);
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
        const employees = await transactionalEntityManager.find(EmployeeEntity);
        return this.mapper.mapArrayAsync(
          employees,
          EmployeeDto,
          EmployeeEntity,
        );
      },
    );
  }

  /**
   * Create employee
   * @param {EmployeeCreateDto} employeeCreateDto
   * @returns {Promise<EmployeeDto>}
   */
  async createEmployee(
    employeeCreateDto: EmployeeCreateDto,
  ): Promise<EmployeeDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = transactionalEntityManager.create(
          EmployeeEntity,
          employeeCreateDto,
        );
        await transactionalEntityManager.save(employee);
        return this.mapper.mapAsync(employee, EmployeeDto, EmployeeEntity);
      },
    );
  }

  /**
   * Update employee
   * @param {number} empno
   * @param {EmployeePutDto} employeePutDto
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
        if (!employee) throw new EmployeeNotFoundError(empno);
        employee.ename = employeePutDto.ename;
        employee.job = employeePutDto.job;
        employee.mgr = employeePutDto.mgr;
        employee.hiredate = employeePutDto.hiredate;
        employee.sal = employeePutDto.sal;
        employee.comm = employeePutDto.comm;
        employee.dept = employeePutDto.dept;
        await transactionalEntityManager.update(
          Employee,
          { empno: empno },
          employee,
        );
        return this.mapper.mapAsync(employee, EmployeeDto, EmployeeEntity);
      },
    );
  }

  /**
   * Patch employee
   * @param {number} empno
   * @param {EmployeePatchDto} employeePatchDto
   * @returns {Promise<EmployeeDto>}
   */
  async patchEmployee(
    empno: number,
    employeePatchDto: EmployeePatchDto,
  ): Promise<Employee> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const employee = await transactionalEntityManager.findOne(
          EmployeeEntity,
          {
            where: { empno: empno },
          },
        );
        if (!employee) throw new EmployeeNotFoundError(empno);
        employee.job = employeePatchDto.job ?? employee.job;
        employee.mgr = employeePatchDto.mgr ?? employee.mgr;
        employee.sal = employeePatchDto.sal ?? employee.sal;
        employee.comm = employeePatchDto.comm ?? employee.comm;
        employee.dept = employeePatchDto.dept ?? employee.dept;
        await transactionalEntityManager.update(
          EmployeeEntity,
          { empno: empno },
          employee,
        );
        return this.mapper.mapAsync(employee, EmployeeDto, EmployeeEntity);
      },
    );
  }

  /**
   * Delete employee
   * @param {number} empno
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
        if (!employee) throw new EmployeeNotFoundError(empno);
        await transactionalEntityManager.delete(EmployeeEntity, {
          empno: empno,
        });
      },
    );
  }
}
