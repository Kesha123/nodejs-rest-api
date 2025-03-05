import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDeleteDto {
  @ApiProperty({ description: 'Employee number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  empno: number;
}
