import { DepartmentDto } from '../../src/company/dtos/department/department.dto';
import { DepartmentCreateDto } from '../../src/company/dtos/department/department-create.dto';
import { DepartmentPutDto } from '../../src/company/dtos/department/department-put.dto';
import { DepartmentPatchDto } from '../../src/company/dtos/department/department-patch.dto';
import { NotFoundException } from '@nestjs/common';

export const mockDepartmentService = {
  getDepartment: jest
    .fn()
    .mockImplementation((deptno: number): Promise<DepartmentDto> => {
      if (deptno === 999) {
        return Promise.reject(
          new NotFoundException(`Department with deptno ${deptno} not found`),
        );
      }

      return Promise.resolve({
        deptno: deptno,
        dname: 'TEST_DEPARTMENT',
        loc: 'TEST_LOCATION',
      } as DepartmentDto);
    }),

  getDepartments: jest.fn().mockImplementation((): Promise<DepartmentDto[]> => {
    return Promise.resolve([
      {
        deptno: 10,
        dname: 'ACCOUNTING',
        loc: 'NEW YORK',
      },
      {
        deptno: 20,
        dname: 'RESEARCH',
        loc: 'DALLAS',
      },
      {
        deptno: 30,
        dname: 'SALES',
        loc: 'CHICAGO',
      },
    ]);
  }),

  createDepartment: jest
    .fn()
    .mockImplementation(
      (departmentCreateDto: DepartmentCreateDto): Promise<DepartmentDto> => {
        return Promise.resolve({
          deptno: 40,
          dname: departmentCreateDto.dname,
          loc: departmentCreateDto.loc,
        });
      },
    ),

  putDepartment: jest
    .fn()
    .mockImplementation(
      (
        deptno: number,
        departmentPutDto: DepartmentPutDto,
      ): Promise<DepartmentDto> => {
        if (deptno === 999) {
          return Promise.reject(
            new NotFoundException(`Department with deptno ${deptno} not found`),
          );
        }

        return Promise.resolve({
          deptno,
          dname: departmentPutDto.dname,
          loc: departmentPutDto.loc,
        });
      },
    ),

  patchDepartment: jest
    .fn()
    .mockImplementation(
      (
        deptno: number,
        departmentPatchDto: DepartmentPatchDto,
      ): Promise<DepartmentDto> => {
        if (deptno === 999) {
          return Promise.reject(
            new NotFoundException(`Department with deptno ${deptno} not found`),
          );
        }

        const baseDepartment = {
          deptno,
          dname: 'TEST_DEPARTMENT',
          loc: 'TEST_LOCATION',
        };

        return Promise.resolve({
          ...baseDepartment,
          dname: departmentPatchDto.dname ?? baseDepartment.dname,
          loc: departmentPatchDto.loc ?? baseDepartment.loc,
        });
      },
    ),

  deleteDepartment: jest
    .fn()
    .mockImplementation((deptno: number): Promise<void> => {
      if (deptno === 999) {
        return Promise.reject(
          new NotFoundException(`Department with deptno ${deptno} not found`),
        );
      }

      return Promise.resolve();
    }),
};
