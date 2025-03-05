import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentGetDto {
  @ApiProperty({ description: 'Department number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  deptno: number;
}
