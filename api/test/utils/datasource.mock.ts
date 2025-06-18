import {
  DepartmentEntity,
  EmployeeEntity,
} from '@kesha123/nodejs-rest-api-datasource';

const mockEmployees: EmployeeEntity[] = [
  {
    empno: 1,
    ename: 'SMITH',
    job: 'CLERK',
    mgr: 7902,
    hiredate: new Date('1980-12-17'),
    sal: 800,
    comm: null,
    dept: { deptno: 20, dname: 'RESEARCH', loc: 'DALLAS' },
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
  {
    empno: 3,
    ename: 'WARD',
    job: 'SALESMAN',
    mgr: 7698,
    hiredate: new Date('1981-02-22'),
    sal: 1250,
    comm: 500,
    dept: { deptno: 30, dname: 'SALES', loc: 'CHICAGO' },
  },
];

const mockDepartments: DepartmentEntity[] = [
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
];

export const mockEntityManager = {
  transaction: jest.fn().mockImplementation(async (callback) => {
    return await callback(mockEntityManager);
  }),

  find: jest.fn().mockImplementation((entityClass) => {
    if (entityClass === EmployeeEntity) {
      return Promise.resolve([...mockEmployees]);
    }
    if (entityClass === DepartmentEntity) {
      return Promise.resolve([...mockDepartments]);
    }
    return Promise.resolve([]);
  }),

  findOne: jest.fn().mockImplementation((entityClass, options) => {
    const { where } = options || {};

    if (entityClass === EmployeeEntity) {
      const employee = mockEmployees.find((e) => e.empno === where.empno);
      return Promise.resolve(employee || null);
    }

    if (entityClass === DepartmentEntity) {
      const department = mockDepartments.find((d) => d.deptno === where.deptno);
      return Promise.resolve(department || null);
    }

    return Promise.resolve(null);
  }),

  create: jest.fn().mockImplementation((entityClass, entityData) => {
    if (entityClass === EmployeeEntity) {
      return {
        ...entityData,
        empno: mockEmployees.length + 1,
      };
    }

    if (entityClass === DepartmentEntity) {
      return {
        ...entityData,
        deptno: mockDepartments.length + 1,
      };
    }

    return entityData;
  }),

  save: jest.fn().mockImplementation((entity) => {
    if ('empno' in entity) {
      const existingIndex = mockEmployees.findIndex(
        (e) => e.empno === entity.empno,
      );

      if (existingIndex >= 0) {
        mockEmployees[existingIndex] = { ...entity };
      } else {
        mockEmployees.push(entity);
      }

      return Promise.resolve({ ...entity });
    }

    if ('deptno' in entity) {
      const existingIndex = mockDepartments.findIndex(
        (d) => d.deptno === entity.deptno,
      );

      if (existingIndex >= 0) {
        mockDepartments[existingIndex] = { ...entity };
      } else {
        mockDepartments.push(entity);
      }

      return Promise.resolve({ ...entity });
    }

    return Promise.resolve(entity);
  }),

  update: jest.fn().mockImplementation((entityClass, criteria, entityData) => {
    if (entityClass === EmployeeEntity) {
      const employeeIndex = mockEmployees.findIndex(
        (e) => e.empno === criteria.empno,
      );

      if (employeeIndex >= 0) {
        mockEmployees[employeeIndex] = {
          ...mockEmployees[employeeIndex],
          ...entityData,
        };
      }

      return Promise.resolve({ affected: employeeIndex >= 0 ? 1 : 0 });
    }

    if (entityClass === DepartmentEntity) {
      const departmentIndex = mockDepartments.findIndex(
        (d) => d.deptno === criteria.deptno,
      );

      if (departmentIndex >= 0) {
        mockDepartments[departmentIndex] = {
          ...mockDepartments[departmentIndex],
          ...entityData,
        };
      }

      return Promise.resolve({ affected: departmentIndex >= 0 ? 1 : 0 });
    }

    return Promise.resolve({ affected: 0 });
  }),

  delete: jest.fn().mockImplementation((entityClass, criteria) => {
    if (entityClass === EmployeeEntity) {
      const initialLength = mockEmployees.length;
      const employeeIndex = mockEmployees.findIndex(
        (e) => e.empno === criteria.empno,
      );

      if (employeeIndex >= 0) {
        mockEmployees.splice(employeeIndex, 1);
      }

      return Promise.resolve({
        affected: initialLength - mockEmployees.length,
      });
    }

    if (entityClass === DepartmentEntity) {
      const initialLength = mockDepartments.length;
      const departmentIndex = mockDepartments.findIndex(
        (d) => d.deptno === criteria.deptno,
      );

      if (departmentIndex >= 0) {
        mockDepartments.splice(departmentIndex, 1);
      }

      return Promise.resolve({
        affected: initialLength - mockDepartments.length,
      });
    }

    return Promise.resolve({ affected: 0 });
  }),
};

export const mockDataSource = {
  manager: mockEntityManager,
  transaction: mockEntityManager.transaction,
};

export const resetMocks = () => {
  jest.clearAllMocks();

  mockEmployees.length = 0;
  mockEmployees.push(
    {
      empno: 1,
      ename: 'SMITH',
      job: 'CLERK',
      mgr: 7902,
      hiredate: new Date('1980-12-17'),
      sal: 800,
      comm: null,
      dept: { deptno: 20, dname: 'RESEARCH', loc: 'DALLAS' },
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
    {
      empno: 3,
      ename: 'WARD',
      job: 'SALESMAN',
      mgr: 7698,
      hiredate: new Date('1981-02-22'),
      sal: 1250,
      comm: 500,
      dept: { deptno: 30, dname: 'SALES', loc: 'CHICAGO' },
    },
  );

  mockDepartments.length = 0;
  mockDepartments.push(
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
  );
};
