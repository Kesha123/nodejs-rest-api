import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class Department {
  @IsNumber()
  @IsNotEmpty()
  deptno: number;

  @IsString()
  @IsOptional()
  dname?: string;

  @IsString()
  @IsOptional()
  loc?: string;
}
