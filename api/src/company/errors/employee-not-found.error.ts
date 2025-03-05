export class EmployeeNotFoundError extends Error {
  constructor(deptno: number) {
    super(`Employee with deptno ${deptno} not found`);
  }
}
