import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeController } from './controllers/employee.controller';
import { DepartmentController } from './controllers/department.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ApiDataSource, getDataSourceOptions } from '../datasource';
import { MapperProfile } from './mapper/mapper-profile';

@Module({
  providers: [DepartmentService, EmployeeService, MapperProfile],
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => getDataSourceOptions(),
      dataSourceFactory: async () => {
        await ApiDataSource.initialize();
        return ApiDataSource;
      },
    }),
  ],
  controllers: [EmployeeController, DepartmentController],
  exports: [DepartmentService, EmployeeService],
})
export class CompanyModule {}
