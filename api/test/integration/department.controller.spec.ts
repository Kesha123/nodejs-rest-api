import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { DepartmentController } from '../../src/company/controllers/department.controller';
import { DepartmentService } from '../../src/company/services/department.service';
import { DepartmentNotFoundError } from '../../src/company/errors/department-not-found.error';
import { mockDepartmentService } from '../utils/department-service.mock';

describe('DepartmentController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: mockDepartmentService,
        },
      ],
    }).compile();

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

  describe('GET /department/:deptno', () => {
    it('should return a department when it exists', () => {
      const deptno = 10;

      return request(app.getHttpServer())
        .get(`/department/${deptno}`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('deptno', deptno);
          expect(res.body).toHaveProperty('dname', 'TEST_DEPARTMENT');
          expect(mockDepartmentService.getDepartment).toHaveBeenCalledWith(
            deptno,
          );
        });
    });

    it('should return 404 when department does not exist', () => {
      const deptno = 999;

      mockDepartmentService.getDepartment.mockRejectedValueOnce(
        new DepartmentNotFoundError(deptno),
      );

      return request(app.getHttpServer())
        .get(`/department/${deptno}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(deptno.toString());
          expect(mockDepartmentService.getDepartment).toHaveBeenCalledWith(
            deptno,
          );
        });
    });
  });

  describe('GET /department', () => {
    it('should return all departments', () => {
      return request(app.getHttpServer())
        .get('/department')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(3);
          expect(mockDepartmentService.getDepartments).toHaveBeenCalled();
        });
    });
  });

  describe('POST /department', () => {
    it('should create a new department', () => {
      const newDepartment = {
        dname: 'ENGINEERING',
        loc: 'AUSTIN',
      };

      return request(app.getHttpServer())
        .post('/department')
        .send(newDepartment)
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body).toHaveProperty('deptno', 40);
          expect(res.body).toHaveProperty('dname', newDepartment.dname);
          expect(res.body).toHaveProperty('loc', newDepartment.loc);
          expect(mockDepartmentService.createDepartment).toHaveBeenCalledWith(
            expect.objectContaining(newDepartment),
          );
        });
    });

    it('should create a department with minimal data', () => {
      const minimalDepartment = {}; // Both fields are optional

      return request(app.getHttpServer())
        .post('/department')
        .send(minimalDepartment)
        .expect(HttpStatus.CREATED)
        .expect(() => {
          expect(mockDepartmentService.createDepartment).toHaveBeenCalled();
        });
    });
  });

  describe('PUT /department/:deptno', () => {
    it('should update a department when it exists', () => {
      const deptno = 10;
      const updatedDepartment = {
        dname: 'UPDATED_DEPARTMENT',
        loc: 'UPDATED_LOCATION',
      };

      return request(app.getHttpServer())
        .put(`/department/${deptno}`)
        .send(updatedDepartment)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('deptno', deptno);
          expect(res.body).toHaveProperty('dname', updatedDepartment.dname);
          expect(res.body).toHaveProperty('loc', updatedDepartment.loc);
          expect(mockDepartmentService.putDepartment).toHaveBeenCalledWith(
            deptno,
            expect.objectContaining(updatedDepartment),
          );
        });
    });

    it('should return 404 when department does not exist', () => {
      const deptno = 999;
      const updatedDepartment = {
        dname: 'UPDATED_DEPARTMENT',
        loc: 'UPDATED_LOCATION',
      };

      mockDepartmentService.putDepartment.mockRejectedValueOnce(
        new DepartmentNotFoundError(deptno),
      );

      return request(app.getHttpServer())
        .put(`/department/${deptno}`)
        .send(updatedDepartment)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(deptno.toString());
        });
    });
  });

  describe('PATCH /department/:deptno', () => {
    it('should partially update a department when it exists', () => {
      const deptno = 10;
      const partialUpdate = {
        dname: 'UPDATED_DEPARTMENT',
      };

      return request(app.getHttpServer())
        .patch(`/department/${deptno}`)
        .send(partialUpdate)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty('deptno', deptno);
          expect(res.body).toHaveProperty('dname', partialUpdate.dname);
          expect(mockDepartmentService.patchDepartment).toHaveBeenCalledWith(
            deptno,
            expect.objectContaining(partialUpdate),
          );
        });
    });

    it('should return 404 when department does not exist', () => {
      const deptno = 999;
      const partialUpdate = {
        loc: 'UPDATED_LOCATION',
      };

      mockDepartmentService.patchDepartment.mockRejectedValueOnce(
        new DepartmentNotFoundError(deptno),
      );

      return request(app.getHttpServer())
        .patch(`/department/${deptno}`)
        .send(partialUpdate)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(deptno.toString());
        });
    });
  });

  describe('DELETE /department/:deptno', () => {
    it('should delete a department when it exists', () => {
      const deptno = 10;

      return request(app.getHttpServer())
        .delete(`/department/${deptno}`)
        .expect(HttpStatus.NO_CONTENT)
        .expect(() => {
          expect(mockDepartmentService.deleteDepartment).toHaveBeenCalledWith(
            deptno,
          );
        });
    });

    it('should return 404 when department does not exist', () => {
      const deptno = 999;

      mockDepartmentService.deleteDepartment.mockRejectedValueOnce(
        new DepartmentNotFoundError(deptno),
      );

      return request(app.getHttpServer())
        .delete(`/department/${deptno}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain(deptno.toString());
        });
    });
  });
});
