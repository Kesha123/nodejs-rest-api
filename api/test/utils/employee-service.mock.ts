import { EmployeeDto } from '../../src/company/dtos/employee/employee.dto';
import { EmployeeCreateDto } from '../../src/company/dtos/employee/employee-create.dto';
import { EmployeePutDto } from '../../src/company/dtos/employee/employee-put.dto';
import { EmployeePatchDto } from '../../src/company/dtos/employee/employee-patch.dto';
import { NotFoundException } from '@nestjs/common';

export const mockEmployeeService = {
  getEmployee: jest
    .fn()
    .mockImplementation((empno: number): Promise<EmployeeDto> => {
      if (empno === 999) {
        return Promise.reject(
          new NotFoundException(`Employee with empno ${empno} not found`),
        );
      }

      return Promise.resolve({
        empno,
        ename: 'TEST_EMPLOYEE',
        job: 'TESTER',
        mgr: 7902,
        hiredate: new Date('2023-01-01'),
        sal: 5000,
        comm: 500,
        dept: { deptno: 10, dname: 'RESEARCH', loc: 'DALLAS' },
      });
    }),

  getEmployees: jest.fn().mockImplementation((): Promise<EmployeeDto[]> => {
    return Promise.resolve([
      {
        empno: 1,
        ename: 'SMITH',
        job: 'CLERK',
        mgr: 7902,
        hiredate: new Date('1980-12-17'),
        sal: 800,
        comm: null,
        dept: { deptno: 10, dname: 'RESEARCH', loc: 'DALLAS' },
      },
      {
        empno: 2,
        ename: 'ALLEN',
        job: 'SALESMAN',
        mgr: 7698,
        hiredate: new Date('1981-02-20'),
        sal: 1600,
        comm: 300,
        dept: { deptno: 30, dname: 'SALES', loc: 'CHICAGO' },
      },
    ]);
  }),

  createEmployee: jest
    .fn()
    .mockImplementation(
      (employeeCreateDto: EmployeeCreateDto): Promise<EmployeeDto> => {
        return Promise.resolve({
          empno: 4,
          ename: employeeCreateDto.ename,
          job: employeeCreateDto.job,
          mgr: employeeCreateDto.mgr,
          hiredate: employeeCreateDto.hiredate,
          sal: employeeCreateDto.sal,
          comm: employeeCreateDto.comm,
          dept: {
            deptno: employeeCreateDto.dept,
            dname: 'RESEARCH',
            loc: 'DALLAS',
          },
        });
      },
    ),

  putEmployee: jest
    .fn()
    .mockImplementation(
      (empno: number, employeePutDto: EmployeePutDto): Promise<EmployeeDto> => {
        if (empno === 999) {
          return Promise.reject(
            new NotFoundException(`Employee with empno ${empno} not found`),
          );
        }

        return Promise.resolve({
          empno,
          ename: employeePutDto.ename,
          job: employeePutDto.job,
          mgr: employeePutDto.mgr,
          hiredate: new Date(employeePutDto.hiredate),
          sal: employeePutDto.sal,
          comm: employeePutDto.comm,
          dept: {
            deptno: employeePutDto.dept,
            dname: 'RESEARCH',
            loc: 'DALLAS',
          },
        });
      },
    ),

  patchEmployee: jest
    .fn()
    .mockImplementation(
      (
        empno: number,
        employeePatchDto: EmployeePatchDto,
      ): Promise<EmployeeDto> => {
        if (empno === 999) {
          return Promise.reject(
            new NotFoundException(`Employee with empno ${empno} not found`),
          );
        }

        const baseEmployee = {
          empno,
          ename: 'TEST_EMPLOYEE',
          job: 'TESTER',
          mgr: 7902,
          hiredate: new Date('2023-01-01'),
          sal: 5000,
          comm: 500,
          dept: 10,
        };

        return Promise.resolve({
          ...baseEmployee,
          job: employeePatchDto.job ?? baseEmployee.job,
          mgr: employeePatchDto.mgr ?? baseEmployee.mgr,
          sal: employeePatchDto.sal ?? baseEmployee.sal,
          comm: employeePatchDto.comm ?? baseEmployee.comm,
          dept: {
            deptno: employeePatchDto.dept,
            dname: 'RESEARCH',
            loc: 'DALLAS',
          },
        });
      },
    ),

  deleteEmployee: jest
    .fn()
    .mockImplementation((empno: number): Promise<void> => {
      if (empno === 999) {
        return Promise.reject(
          new NotFoundException(`Employee with empno ${empno} not found`),
        );
      }

      return Promise.resolve();
    }),
};
