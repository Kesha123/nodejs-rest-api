import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeeController } from '../../src/company/controllers/employee.controller';
import { DepartmentController } from '../../src/company/controllers/department.controller';
import { EmployeeService } from '../../src/company/services/employee.service';
import { DepartmentService } from '../../src/company/services/department.service';
import { mockDepartmentService } from '../utils/department-service.mock';
import { mockEmployeeService } from '../utils/employee-service.mock';

describe('Error Handling (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController, DepartmentController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
        {
          provide: DepartmentService,
          useValue: mockDepartmentService,
        },
      ],
    }).compile();

    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('General error handling', () => {
    it('should handle unexpected errors from employee service', () => {
      const empno = 1;
      const unexpectedError = new Error('Database connection failed');

      mockEmployeeService.getEmployee.mockRejectedValueOnce(unexpectedError);

      return request(app.getHttpServer())
        .get(`/employee/${empno}`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(mockEmployeeService.getEmployee).toHaveBeenCalledWith(empno);
        });
    });

    it('should handle unexpected errors from department service', () => {
      const deptno = 10;
      const unexpectedError = new Error('Database connection failed');

      mockDepartmentService.getDepartment.mockRejectedValueOnce(
        unexpectedError,
      );

      return request(app.getHttpServer())
        .get(`/department/${deptno}`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(mockDepartmentService.getDepartment).toHaveBeenCalledWith(
            deptno,
          );
        });
    });
  });

  describe('Validation Errors', () => {
    it('should validate that employee number is numeric', () => {
      return request(app.getHttpServer())
        .get('/employee/not-a-number')
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(mockEmployeeService.getEmployee).not.toHaveBeenCalled();
        });
    });

    it('should validate that department number is numeric', () => {
      return request(app.getHttpServer())
        .get('/department/not-a-number')
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(mockDepartmentService.getDepartment).not.toHaveBeenCalled();
        });
    });
  });
});
