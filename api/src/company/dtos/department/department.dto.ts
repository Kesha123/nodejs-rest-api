import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class DepartmentDto {
  @ApiProperty({ description: 'Department number', example: 1 })
  @AutoMap()
  deptno: number;

  @ApiProperty({
    description: 'Department name',
    maxLength: 14,
    required: false,
  })
  @AutoMap()
  dname: string;

  @ApiProperty({ description: 'Location', maxLength: 13, required: false })
  @AutoMap()
  loc: string;
}
