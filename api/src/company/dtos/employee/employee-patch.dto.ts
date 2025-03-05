import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeePatchDto {
  @ApiProperty({ description: 'Job title', maxLength: 9, required: false })
  @IsString()
  @IsOptional()
  job?: string;

  @ApiProperty({ description: 'Manager number', required: false })
  @IsNumber()
  @IsOptional()
  mgr?: number;

  @ApiProperty({
    description: 'Salary',
    type: 'number',
    format: 'decimal',
    required: false,
    example: 5000.0,
  })
  @IsNumber()
  @IsOptional()
  sal?: number;

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

  @ApiProperty({ description: 'Department', required: false })
  @IsOptional()
  dept?: number;
}
