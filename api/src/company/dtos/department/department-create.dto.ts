import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentCreateDto {
  @ApiProperty({
    description: 'Department name',
    maxLength: 14,
    required: false,
  })
  @IsString()
  @IsOptional()
  dname?: string;

  @ApiProperty({ description: 'Location', maxLength: 13, required: false })
  @IsString()
  @IsOptional()
  loc?: string;
}
