import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  EmployeeEntity,
  DepartmentEntity,
} from '@kesha123/nodejs-rest-api-datasource';
import * as fs from 'fs';
import { join } from 'path';

config();

const configService = new ConfigService();

export const getDataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  synchronize: false,
  logging: false,
  entities: [EmployeeEntity, DepartmentEntity],
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(join(__dirname, '../ssl/ca.crt')).toString(),
    key: fs.readFileSync(join(__dirname, '../ssl/server.key')).toString(),
    cert: fs.readFileSync(join(__dirname, '../ssl/server.crt')).toString(),
  },
});

export const ApiDataSource = new DataSource(getDataSourceOptions());
