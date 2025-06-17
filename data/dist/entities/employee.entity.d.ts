import { DepartmentEntity } from './department.entity';
export declare class EmployeeEntity {
    empno: number;
    ename: string;
    job: string;
    mgr: number;
    hiredate: Date;
    sal: number;
    comm: number;
    dept: DepartmentEntity;
}
