export class DepartmentNotFoundError extends Error {
  constructor(deptno: number) {
    super(`Department with deptno ${deptno} not found`);
  }
}
