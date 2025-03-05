import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Mapper } from '@automapper/core';
import { DepartmentEntity } from '../entities/department.entity';
import { Department } from '../models/department.model';
import { DepartmentCreateDto } from '../dtos/department/department-create.dto';
import { DepartmentPutDto } from '../dtos/department/department-put.dto';
import { DepartmentPatchDto } from '../dtos/department/department-patch.dto';
import { DepartmentNotFoundError } from '../errors/department-not-found.error';
import { DepartmentDto } from '../dtos/department/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Get department by deptno
   * @param {number} deptno
   * @returns {Promise<DepartmentDto>}
   */
  async getDepartment(deptno: number): Promise<DepartmentDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          {
            where: { deptno: deptno },
          },
        );
        if (!department) throw new DepartmentNotFoundError(deptno);
        return this.mapper.mapAsync(
          department,
          DepartmentEntity,
          DepartmentDto,
        );
      },
    );
  }

  /**
   * Get all departments
   * @returns {Promise<DepartmentDto[]>}
   */
  async getDepartments(): Promise<DepartmentDto[]> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const departments =
          await transactionalEntityManager.find(DepartmentEntity);
        return this.mapper.mapArrayAsync(
          departments,
          DepartmentDto,
          DepartmentEntity,
        );
      },
    );
  }

  /**
   * Create department
   * @param {DepartmentCreateDto} departmentCreateDto
   * @returns {Promise<DepartmentDto>}
   */
  async createDepartment(
    departmentCreateDto: DepartmentCreateDto,
  ): Promise<DepartmentDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const department = transactionalEntityManager.create(
          DepartmentEntity,
          departmentCreateDto,
        );
        await transactionalEntityManager.save(department);
        return this.mapper.mapAsync(
          department,
          DepartmentDto,
          DepartmentEntity,
        );
      },
    );
  }

  /**
   * Update department
   * @param {number} deptno
   * @param {DepartmentPutDto} departmentPutDto
   * @returns {Promise<DepartmentDto>}
   */
  async putDepartment(
    deptno: number,
    departmentPutDto: DepartmentPutDto,
  ): Promise<DepartmentDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          { where: { deptno: deptno } },
        );
        if (!department) throw new DepartmentNotFoundError(deptno);
        department.dname = departmentPutDto.dname;
        department.loc = departmentPutDto.loc;
        await transactionalEntityManager.update(
          DepartmentEntity,
          { deptno: deptno },
          department,
        );
        return this.mapper.mapAsync(
          department,
          DepartmentDto,
          DepartmentEntity,
        );
      },
    );
  }

  /**
   * Patch department
   * @param {number} deptno
   * @param {DepartmentPatchDto} departmentPatchDto
   * @returns {Promise<DepartmentDto>
   */
  async patchDepartment(
    deptno: number,
    departmentPatchDto: DepartmentPatchDto,
  ): Promise<DepartmentDto> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          { where: { deptno: deptno } },
        );
        if (!department) throw new DepartmentNotFoundError(deptno);
        department.dname = departmentPatchDto.dname ?? department.dname;
        department.loc = departmentPatchDto.loc ?? department.loc;
        await transactionalEntityManager.update(
          DepartmentEntity,
          { deptno: deptno },
          department,
        );
        return this.mapper.mapAsync(
          department,
          DepartmentDto,
          DepartmentEntity,
        );
      },
    );
  }

  /**
   * Delete department
   * @param {number} deptno
   */
  async deleteDepartment(deptno: number): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const department = await transactionalEntityManager.findOne(
          DepartmentEntity,
          { where: { deptno: deptno } },
        );
        if (!department) throw new DepartmentNotFoundError(deptno);
        await transactionalEntityManager.delete(Department, { deptno: deptno });
      },
    );
  }
}
