import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from '../../src/company/services/department.service';
import { DepartmentNotFoundError } from '../../src/company/errors/department-not-found.error';
import { DataSource } from 'typeorm';
import {
  mockDataSource,
  mockEntityManager,
  resetMocks,
} from '../utils/datasource.mock';
import { DepartmentDto } from '../../src/company/dtos/department/department.dto';
import { AutomapperModule } from '@automapper/nestjs';
import { MapperProfile } from '../../src/company/mapper/mapper-profile';
import { classes } from '@automapper/classes';
import { DepartmentCreateDto } from '../../src/company/dtos/department/department-create.dto';
import { DepartmentPutDto } from '../../src/company/dtos/department/department-put.dto';
import { DepartmentPatchDto } from '../../src/company/dtos/department/department-patch.dto';

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(async () => {
    resetMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        MapperProfile,
        DepartmentService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDepartment', () => {
    it('should return a department by deptno', async () => {
      const department = await service.getDepartment(10);

      expect(department).toBeDefined();
      expect(department).toBeInstanceOf(DepartmentDto);
      expect(department.deptno).toBe(10);
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { deptno: 10 },
        },
      );
    });

    it('should throw DepartmentNotFoundError if employee not found', async () => {
      await expect(service.getDepartment(999)).rejects.toThrow(
        DepartmentNotFoundError,
      );
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { deptno: 999 },
        },
      );
    });
  });

  describe('getDepartments', () => {
    it('should return all departments', async () => {
      const departments = await service.getDepartments();

      expect(Array.isArray(departments)).toBe(true);
      expect(departments.length).toBeGreaterThan(0);
      expect(mockEntityManager.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createDepartment', () => {
    it('should create and return a new department', async () => {
      const createDto: DepartmentCreateDto = {
        dname: 'OPERATIONS',
        loc: 'BOSTON',
      };

      const result = await service.createDepartment(createDto);

      expect(result).toBeDefined();
      expect(result.dname).toBe('OPERATIONS');
      expect(mockEntityManager.create).toHaveBeenCalledWith(
        expect.anything(),
        createDto,
      );
      expect(mockEntityManager.save).toHaveBeenCalled();
    });
  });

  describe('putDepartment', () => {
    it('should update an existing department', async () => {
      const putDto: DepartmentPutDto = {
        dname: 'RESEARCH & DEV',
        loc: 'AUSTIN',
      };

      const result = await service.putDepartment(20, putDto);

      expect(result).toBeDefined();
      expect(result.dname).toBe('RESEARCH & DEV');
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { deptno: 20 },
        },
      );
      expect(mockEntityManager.update).toHaveBeenCalled();
    });

    it('should throw DepartmentNotFoundError if department not found', async () => {
      const putDto: DepartmentPutDto = {
        dname: 'RESEARCH & DEV',
        loc: 'AUSTIN',
      };

      await expect(service.putDepartment(999, putDto)).rejects.toThrow(
        DepartmentNotFoundError,
      );
    });
  });

  describe('patchDepartment', () => {
    it('should partially update a department', async () => {
      const patchDto: DepartmentPatchDto = {
        loc: 'SEATTLE',
      };

      const result = await service.patchDepartment(20, patchDto);

      expect(result).toBeDefined();
      expect(result.loc).toBe('SEATTLE');
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { deptno: 20 },
        },
      );
      expect(mockEntityManager.update).toHaveBeenCalled();
    });

    it('should maintain existing values for undefined fields', async () => {
      const patchDto: DepartmentPatchDto = {
        loc: 'SEATTLE',
        // dname is undefined
      };

      const result = await service.patchDepartment(20, patchDto);

      expect(result).toBeDefined();
      expect(result.loc).toBe('SEATTLE');
      // Ensure other fields were not changed
      expect(result.dname).not.toBeUndefined();
    });

    it('should throw DepartmentNotFoundError if department not found', async () => {
      const patchDto: DepartmentPatchDto = {
        loc: 'SEATTLE',
      };

      await expect(service.patchDepartment(999, patchDto)).rejects.toThrow(
        DepartmentNotFoundError,
      );
    });
  });

  describe('deleteDepartment', () => {
    it('should delete a department', async () => {
      await service.deleteDepartment(10);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(
        expect.anything(),
        {
          where: { deptno: 10 },
        },
      );
      expect(mockEntityManager.delete).toHaveBeenCalledWith(expect.anything(), {
        deptno: 10,
      });
    });

    it('should throw DepartmentNotFoundError if department not found', async () => {
      await expect(service.deleteDepartment(999)).rejects.toThrow(
        DepartmentNotFoundError,
      );
    });
  });
});
