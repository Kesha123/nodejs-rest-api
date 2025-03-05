import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeeController } from '../../src/company/controllers/employee.controller';
import { EmployeeService } from '../../src/company/services/employee.service';
import { EmployeeNotFoundError } from '../../src/company/errors/employee-not-found.error';
import { mockEmployeeService } from '../utils/employee-service.mock';

describe('EmployeeController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /employee/:empno', () => {
    it('should return an employee when it exists', () => {
      const empno = 1;

      return request(app.getHttpServer())
        .get(`/employee/${empno}`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('empno', empno);
          expect(res.body).toHaveProperty('ename', 'TEST_EMPLOYEE');
          expect(mockEmployeeService.getEmployee).toHaveBeenCalledWith(empno);
        });
    });

    it('should return 404 when employee does not exist', () => {
      const empno = 999;

      mockEmployeeService.getEmployee.mockRejectedValueOnce(
        new EmployeeNotFoundError(empno),
      );

      return request(app.getHttpServer())
        .get(`/employee/${empno}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(empno.toString());
          expect(mockEmployeeService.getEmployee).toHaveBeenCalledWith(empno);
        });
    });
  });

  describe('GET /employee', () => {
    it('should return all employees', () => {
      return request(app.getHttpServer())
        .get('/employee')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(2);
          expect(mockEmployeeService.getEmployees).toHaveBeenCalled();
        });
    });
  });

  describe('POST /employee', () => {
    it('should create a new employee', () => {
      const newEmployee = {
        ename: 'JACKSON',
        job: 'DEVELOPER',
        mgr: 7902,
        hiredate: new Date('2023-01-01'),
        sal: 6000,
        comm: 800,
        dept: 20,
      };

      return request(app.getHttpServer())
        .post('/employee')
        .send(newEmployee)
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body).toHaveProperty('empno', 4);
          expect(res.body).toHaveProperty('ename', newEmployee.ename);
          expect(mockEmployeeService.createEmployee).toHaveBeenCalledWith(
            expect.objectContaining({
              ename: newEmployee.ename,
              job: newEmployee.job,
            }),
          );
        });
    });

    it('should return 400 when request data is invalid', () => {
      const invalidEmployee = {
        job: 'DEVELOPER',
        sal: 6000,
      };

      return request(app.getHttpServer())
        .post('/employee')
        .send(invalidEmployee)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PUT /employee/:empno', () => {
    it('should update an employee when it exists', () => {
      const empno = 1;
      const updatedEmployee = {
        ename: 'UPDATED_EMPLOYEE',
        job: 'SENIOR',
        mgr: 7902,
        hiredate: new Date('2023-01-01'),
        sal: 7000,
        comm: 1000,
        dept: 20,
      };

      return request(app.getHttpServer())
        .put(`/employee/${empno}`)
        .send(updatedEmployee)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('empno', empno);
          expect(res.body).toHaveProperty('ename', updatedEmployee.ename);
          // expect(mockEmployeeService.putEmployee).toHaveBeenCalledWith(
          //   empno,
          //   expect.objectContaining({
          //     ...updatedEmployee,
          //     hiredate: new Date(updatedEmployee.hiredate)
          //   })
          // );
        });
    });

    it('should return 404 when employee does not exist', () => {
      const empno = 999;
      const updatedEmployee = {
        ename: 'UPDATED_EMPLOYEE',
        job: 'SENIOR',
        mgr: 7902,
        hiredate: new Date('2023-01-01'),
        sal: 7000,
        comm: 1000,
        dept: 20,
      };

      mockEmployeeService.putEmployee.mockRejectedValueOnce(
        new EmployeeNotFoundError(empno),
      );

      return request(app.getHttpServer())
        .put(`/employee/${empno}`)
        .send(updatedEmployee)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(empno.toString());
        });
    });

    it('should return 400 when request data is invalid', () => {
      const empno = 1;
      const invalidEmployee = {
        // Missing required fields
        job: 'DEVELOPER',
      };

      return request(app.getHttpServer())
        .put(`/employee/${empno}`)
        .send(invalidEmployee)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /employee/:empno', () => {
    it('should partially update an employee when it exists', () => {
      const empno = 1;
      const partialUpdate = {
        job: 'SENIOR',
        sal: 7500,
      };

      return request(app.getHttpServer())
        .patch(`/employee/${empno}`)
        .send(partialUpdate)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('empno', empno);
          expect(res.body).toHaveProperty('job', partialUpdate.job);
          expect(res.body).toHaveProperty('sal', partialUpdate.sal);
          expect(mockEmployeeService.patchEmployee).toHaveBeenCalledWith(
            empno,
            expect.objectContaining(partialUpdate),
          );
        });
    });

    it('should return 404 when employee does not exist', () => {
      const empno = 999;
      const partialUpdate = {
        job: 'SENIOR',
        sal: 7500,
      };

      mockEmployeeService.patchEmployee.mockRejectedValueOnce(
        new EmployeeNotFoundError(empno),
      );

      return request(app.getHttpServer())
        .patch(`/employee/${empno}`)
        .send(partialUpdate)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(empno.toString());
        });
    });
  });

  describe('DELETE /employee/:empno', () => {
    it('should delete an employee when it exists', () => {
      const empno = 1;

      return request(app.getHttpServer())
        .delete(`/employee/${empno}`)
        .expect(HttpStatus.NO_CONTENT)
        .expect(() => {
          expect(mockEmployeeService.deleteEmployee).toHaveBeenCalledWith(
            empno,
          );
        });
    });

    it('should return 404 when employee does not exist', () => {
      const empno = 999;

      mockEmployeeService.deleteEmployee.mockRejectedValueOnce(
        new EmployeeNotFoundError(empno),
      );

      return request(app.getHttpServer())
        .delete(`/employee/${empno}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(empno.toString());
        });
    });
  });
});
