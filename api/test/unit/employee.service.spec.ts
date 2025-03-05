import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../../src/company/services/employee.service';
import { EmployeeNotFoundError } from '../../src/company/errors/employee-not-found.error';
import { DataSource } from 'typeorm';
import { mockDataSource, mockEntityManager } from '../utils/datasource.mock';
import { EmployeeDto } from '../../src/company/dtos/employee/employee.dto';
import { AutomapperModule } from '@automapper/nestjs';
import { MapperProfile } from '../../src/company/mapper/mapper-profile';
import { classes } from '@automapper/classes';
import { EmployeeCreateDto } from 'src/company/dtos/employee/employee-create.dto';
import { EmployeePatchDto } from 'src/company/dtos/employee/employee-patch.dto';
import { EmployeePutDto } from 'src/company/dtos/employee/employee-put.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        MapperProfile,
        EmployeeService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEmployee', () => {
    it('should return an employee by empno', async () => {
      const employee = await service.getEmployee(1);

      expect(employee).toBeDefined();
      expect(employee).toBeInstanceOf(EmployeeDto);
      expect(employee.empno).toBe(1);
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { empno: 1 },
        },
      );
    });

    it('should throw EmployeeNotFoundError if employee not found', async () => {
      await expect(service.getEmployee(999)).rejects.toThrow(
        EmployeeNotFoundError,
      );
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { empno: 999 },
        },
      );
    });
  });

  describe('getEmployees', () => {
    it('should return all employees', async () => {
      const employees = await service.getEmployees();

      expect(Array.isArray(employees)).toBe(true);
      expect(employees.length).toBeGreaterThan(0);
      expect(mockEntityManager.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createEmployee', () => {
    it('should create and return a new employee', async () => {
      const createDto: EmployeeCreateDto = {
        ename: 'JONES',
        job: 'MANAGER',
        mgr: 7839,
        hiredate: new Date('1981-04-02'),
        sal: 2975,
        comm: null,
        dept: 20,
      };

      const result = await service.createEmployee(createDto);

      expect(result).toBeDefined();
      expect(result.ename).toBe('JONES');
      expect(mockEntityManager.create).toHaveBeenCalledWith(
        expect.anything(),
        createDto,
      );
      expect(mockEntityManager.save).toHaveBeenCalled();
    });
  });

  describe('putEmployee', () => {
    it('should update an existing employee', async () => {
      const putDto: EmployeePutDto = {
        ename: 'BLAKE',
        job: 'MANAGER',
        mgr: 7839,
        hiredate: new Date('1981-05-01'),
        sal: 2850,
        comm: null,
        dept: 30,
      };

      const result = await service.putEmployee(1, putDto);

      expect(result).toBeDefined();
      expect(result.ename).toBe('BLAKE');
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { empno: 1 },
        },
      );
      expect(mockEntityManager.update).toHaveBeenCalled();
    });

    it('should throw EmployeeNotFoundError if employee not found', async () => {
      const putDto: EmployeePutDto = {
        ename: 'BLAKE',
        job: 'MANAGER',
        mgr: 7839,
        hiredate: new Date('1981-05-01'),
        sal: 2850,
        comm: null,
        dept: 30,
      };

      await expect(service.putEmployee(999, putDto)).rejects.toThrow(
        EmployeeNotFoundError,
      );
    });
  });

  describe('patchEmployee', () => {
    it('should partially update an employee', async () => {
      const patchDto: EmployeePatchDto = {
        job: 'SENIOR CLERK',
        sal: 1000,
      };

      const result = await service.patchEmployee(1, patchDto);

      expect(result).toBeDefined();
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { empno: 1 },
        },
      );
      expect(mockEntityManager.update).toHaveBeenCalled();
    });

    it('should maintain existing values for undefined fields', async () => {
      const patchDto: EmployeePatchDto = {
        job: 'SENIOR CLERK',
      };

      const result = await service.patchEmployee(1, patchDto);

      expect(result).toBeDefined();
      expect(result.job).toBe('SENIOR CLERK');
      expect(result.sal).not.toBeUndefined();
    });

    it('should throw EmployeeNotFoundError if employee not found', async () => {
      const patchDto: EmployeePatchDto = {
        job: 'SENIOR CLERK',
      };

      await expect(service.patchEmployee(999, patchDto)).rejects.toThrow(
        EmployeeNotFoundError,
      );
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee', async () => {
      await service.deleteEmployee(1);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { empno: 1 },
        },
      );
      expect(mockEntityManager.delete).toHaveBeenCalledWith(expect.anything(), {
        empno: 1,
      });
    });

    it('should throw EmployeeNotFoundError if employee not found', async () => {
      await expect(service.deleteEmployee(999)).rejects.toThrow(
        EmployeeNotFoundError,
      );
    });
  });
});
