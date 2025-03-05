import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class EmployeeDto {
  @ApiProperty({ description: 'Employee number', example: 1 })
  @AutoMap()
  empno: number;

  @ApiProperty({ description: 'Employee name', maxLength: 10 })
  @AutoMap()
  ename: string;

  @ApiProperty({ description: 'Job title', maxLength: 9 })
  @AutoMap()
  job: string;

  @ApiProperty({ description: 'Manager number', required: false })
  @AutoMap()
  mgr?: number;

  @ApiProperty({ description: 'Hire date' })
  @AutoMap()
  hiredate: Date;

  @ApiProperty({
    description: 'Salary',
    type: 'number',
    format: 'decimal',
    example: 5000.0,
  })
  @AutoMap()
  sal: number;

  @ApiProperty({
    description: 'Commission',
    type: 'number',
    format: 'decimal',
    required: false,
    example: 500.0,
  })
  @AutoMap()
  comm?: number;

  @ApiProperty({ description: 'Department' })
  @AutoMap()
  dept: number;
}
