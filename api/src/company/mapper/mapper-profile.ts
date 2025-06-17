import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DepartmentDto } from '../dtos/department/department.dto';
import { EmployeeDto } from '../dtos/employee/employee.dto';
import {
  DepartmentEntity,
  EmployeeEntity,
} from '@kesha123/nodejs-rest-api-datasource';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        DepartmentDto,
        DepartmentEntity,
        forMember(
          (destination) => destination.deptno,
          mapFrom((source) => source.deptno),
        ),
        forMember(
          (destination) => destination.dname,
          mapFrom((source) => source.dname),
        ),
        forMember(
          (destination) => destination.loc,
          mapFrom((source) => source.loc),
        ),
      );
      createMap(
        mapper,
        DepartmentEntity,
        DepartmentDto,
        forMember(
          (destination) => destination.deptno,
          mapFrom((source) => source.deptno),
        ),
        forMember(
          (destination) => destination.dname,
          mapFrom((source) => source.dname),
        ),
        forMember(
          (destination) => destination.loc,
          mapFrom((source) => source.loc),
        ),
      );

      createMap(
        mapper,
        EmployeeDto,
        EmployeeEntity,
        forMember(
          (destination) => destination.empno,
          mapFrom((source) => source.empno),
        ),
        forMember(
          (destination) => destination.ename,
          mapFrom((source) => source.ename),
        ),
        forMember(
          (destination) => destination.job,
          mapFrom((source) => source.job),
        ),
        forMember(
          (destination) => destination.mgr,
          mapFrom((source) => source.mgr),
        ),
        forMember(
          (destination) => destination.hiredate,
          mapFrom((source) => source.hiredate),
        ),
        forMember(
          (destination) => destination.sal,
          mapFrom((source) => source.sal),
        ),
        forMember(
          (destination) => destination.comm,
          mapFrom((source) => source.comm),
        ),
        forMember(
          (destination) => destination.dept,
          mapFrom((source) => source.dept),
        ),
      );
      createMap(
        mapper,
        EmployeeEntity,
        EmployeeDto,
        forMember(
          (destination) => destination.empno,
          mapFrom((source) => source.empno),
        ),
        forMember(
          (destination) => destination.ename,
          mapFrom((source) => source.ename),
        ),
        forMember(
          (destination) => destination.job,
          mapFrom((source) => source.job),
        ),
        forMember(
          (destination) => destination.mgr,
          mapFrom((source) => source.mgr),
        ),
        forMember(
          (destination) => destination.hiredate,
          mapFrom((source) => source.hiredate),
        ),
        forMember(
          (destination) => destination.sal,
          mapFrom((source) => source.sal),
        ),
        forMember(
          (destination) => destination.comm,
          mapFrom((source) => source.comm),
        ),
        forMember(
          (destination) => destination.dept,
          mapFrom((source) => source.dept),
        ),
      );
    };
  }
}
