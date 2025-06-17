import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Logger,
  ParseIntPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EmployeeService } from '../services/employee.service';
import { EmployeeCreateDto } from '../dtos/employee/employee-create.dto';
import { EmployeePutDto } from '../dtos/employee/employee-put.dto';
import { EmployeePatchDto } from '../dtos/employee/employee-patch.dto';
import { EmployeeDto } from '../dtos/employee/employee.dto';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  private readonly logger;

  constructor(private readonly employeeService: EmployeeService) {
    this.logger = new Logger(EmployeeController.name, {
      timestamp: true,
    });
  }

  @Get(':empno')
  @ApiOperation({ summary: 'Get an employee by empno' })
  @ApiParam({ name: 'empno', description: 'Employee number', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The found employee',
    type: EmployeeDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async getEmployee(
    @Param('empno', ParseIntPipe) empno: number,
  ): Promise<EmployeeDto> {
    try {
      return await this.employeeService.getEmployee(empno);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'List of employees',
    type: [EmployeeDto],
  })
  async getEmployees(): Promise<EmployeeDto[]> {
    return this.employeeService.getEmployees();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: EmployeeCreateDto })
  @ApiResponse({
    status: 201,
    description: 'The created employee',
    type: EmployeeDto,
  })
  async createEmployee(
    @Body() employeeCreateDto: EmployeeCreateDto,
  ): Promise<EmployeeDto> {
    return this.employeeService.createEmployee(employeeCreateDto);
  }

  @Put(':empno')
  @ApiOperation({ summary: 'Update an employee by empno' })
  @ApiParam({ name: 'empno', description: 'Employee number', type: Number })
  @ApiBody({ type: EmployeePutDto })
  @ApiResponse({
    status: 200,
    description: 'The updated employee',
    type: EmployeeDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async putEmployee(
    @Param('empno', ParseIntPipe) empno: number,
    @Body() employeePutDto: EmployeePutDto,
  ): Promise<EmployeeDto> {
    try {
      return await this.employeeService.putEmployee(empno, employeePutDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }

  @Patch(':empno')
  @ApiOperation({ summary: 'Partially update an employee by empno' })
  @ApiParam({ name: 'empno', description: 'Employee number', type: Number })
  @ApiBody({ type: EmployeePatchDto })
  @ApiResponse({
    status: 200,
    description: 'The updated employee',
    type: EmployeeDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async patchEmployee(
    @Param('empno', ParseIntPipe) empno: number,
    @Body() employeePatchDto: EmployeePatchDto,
  ): Promise<EmployeeDto> {
    try {
      return await this.employeeService.patchEmployee(empno, employeePatchDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }

  @Delete(':empno')
  @ApiOperation({ summary: 'Delete an employee by empno' })
  @ApiParam({ name: 'empno', description: 'Employee number', type: Number })
  @ApiResponse({ status: 204, description: 'The employee has been deleted' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmployee(
    @Param('empno', ParseIntPipe) empno: number,
  ): Promise<void> {
    try {
      return await this.employeeService.deleteEmployee(empno);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }
}
