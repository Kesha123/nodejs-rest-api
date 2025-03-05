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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { DepartmentService } from '../services/department.service';
import { DepartmentCreateDto } from '../dtos/department/department-create.dto';
import { DepartmentPutDto } from '../dtos/department/department-put.dto';
import { DepartmentPatchDto } from '../dtos/department/department-patch.dto';
import { DepartmentDto } from '../dtos/department/department.dto';
import { DepartmentNotFoundError } from '../errors/department-not-found.error';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  private readonly logger;

  constructor(private readonly departmentService: DepartmentService) {
    this.logger = new Logger(DepartmentController.name, {
      timestamp: true,
    });
  }

  @Get(':deptno')
  @ApiOperation({ summary: 'Get a department by deptno' })
  @ApiParam({ name: 'deptno', description: 'Department number', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The found department',
    type: DepartmentDto,
  })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async getDepartment(
    @Param('deptno', ParseIntPipe) deptno: number,
  ): Promise<DepartmentDto> {
    try {
      return await this.departmentService.getDepartment(deptno);
    } catch (error) {
      if (error instanceof DepartmentNotFoundError) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({
    status: 200,
    description: 'List of departments',
    type: [DepartmentDto],
  })
  async getDepartments(): Promise<DepartmentDto[]> {
    return this.departmentService.getDepartments();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({ type: DepartmentCreateDto })
  @ApiResponse({
    status: 201,
    description: 'The created department',
    type: DepartmentDto,
  })
  async createDepartment(
    @Body() departmentCreateDto: DepartmentCreateDto,
  ): Promise<DepartmentDto> {
    return this.departmentService.createDepartment(departmentCreateDto);
  }

  @Put(':deptno')
  @ApiOperation({ summary: 'Update a department by deptno' })
  @ApiParam({ name: 'deptno', description: 'Department number', type: Number })
  @ApiBody({ type: DepartmentPutDto })
  @ApiResponse({
    status: 200,
    description: 'The updated department',
    type: DepartmentDto,
  })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async putDepartment(
    @Param('deptno', ParseIntPipe) deptno: number,
    @Body() departmentPutDto: DepartmentPutDto,
  ): Promise<DepartmentDto> {
    try {
      return await this.departmentService.putDepartment(
        deptno,
        departmentPutDto,
      );
    } catch (error) {
      if (error instanceof DepartmentNotFoundError) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }

  @Patch(':deptno')
  @ApiOperation({ summary: 'Partially update a department by deptno' })
  @ApiParam({ name: 'deptno', description: 'Department number', type: Number })
  @ApiBody({ type: DepartmentPatchDto })
  @ApiResponse({
    status: 200,
    description: 'The updated department',
    type: DepartmentDto,
  })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async patchDepartment(
    @Param('deptno', ParseIntPipe) deptno: number,
    @Body() departmentPatchDto: DepartmentPatchDto,
  ): Promise<DepartmentDto> {
    try {
      return await this.departmentService.patchDepartment(
        deptno,
        departmentPatchDto,
      );
    } catch (error) {
      if (error instanceof DepartmentNotFoundError) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }

  @Delete(':deptno')
  @ApiOperation({ summary: 'Delete a department by deptno' })
  @ApiParam({ name: 'deptno', description: 'Department number', type: Number })
  @ApiResponse({ status: 204, description: 'The department has been deleted' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDepartment(
    @Param('deptno', ParseIntPipe) deptno: number,
  ): Promise<void> {
    try {
      await this.departmentService.deleteDepartment(deptno);
    } catch (error) {
      if (error instanceof DepartmentNotFoundError) {
        this.logger.error(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }
}
