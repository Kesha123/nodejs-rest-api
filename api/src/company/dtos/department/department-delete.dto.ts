import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDeleteDto {
  @ApiProperty({ description: 'Department number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  deptno: number;
}
