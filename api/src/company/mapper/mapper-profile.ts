import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Department } from '../models/department.model';
import { DepartmentEntity } from '../entities/department.entity';
import { Employee } from '../models/employee.model';
import { EmployeeEntity } from '../entities/employee.entity';
import { DepartmentDto } from '../dtos/department/department.dto';
import { EmployeeDto } from '../dtos/employee/employee.dto';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Department, DepartmentEntity);
      createMap(mapper, DepartmentEntity, Department);
      createMap(mapper, DepartmentDto, DepartmentEntity);
      createMap(mapper, DepartmentEntity, DepartmentDto);

      createMap(mapper, Employee, EmployeeEntity);
      createMap(mapper, EmployeeEntity, Employee);
      createMap(mapper, EmployeeDto, EmployeeEntity);
      createMap(mapper, EmployeeEntity, EmployeeDto);
    };
  }
}
