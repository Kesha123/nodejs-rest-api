import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeCreateDto {
  @ApiProperty({ description: 'Employee name', maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  ename: string;

  @ApiProperty({ description: 'Job title', maxLength: 9 })
  @IsString()
  @IsNotEmpty()
  job: string;

  @ApiProperty({ description: 'Manager number', required: false })
  @IsNumber()
  @IsOptional()
  mgr?: number;

  @ApiProperty({ description: 'Hire date' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  hiredate: Date;

  @ApiProperty({
    description: 'Salary',
    type: 'number',
    format: 'decimal',
    example: 5000.0,
  })
  @IsNumber()
  @IsNotEmpty()
  sal: number;

  @ApiProperty({
    description: 'Commission',
    type: 'number',
    format: 'decimal',
    required: false,
    example: 500.0,
  })
  @IsNumber()
  @IsOptional()
  comm?: number;

  @ApiProperty({ description: 'Department' })
  @IsNotEmpty()
  @IsNumber()
  dept: number;
}
