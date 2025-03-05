import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

export class Employee {
  @IsNumber()
  @IsNotEmpty()
  empno: number;

  @IsString()
  @IsNotEmpty()
  ename: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsNumber()
  @IsOptional()
  mgr?: number;

  @IsDate()
  @IsNotEmpty()
  hiredate: Date;

  @IsNumber()
  @IsNotEmpty()
  sal: number;

  @IsNumber()
  @IsOptional()
  comm?: number;

  @IsNotEmpty()
  @IsNumber()
  dept: number;
}
