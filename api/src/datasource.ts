import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  EmployeeEntity,
  DepartmentEntity,
} from '@kesha123/nodejs-rest-api-datasource';

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
    ca: process.env.SSL_CA,
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERTIFICATE,
  },
});

export const ApiDataSource = new DataSource(getDataSourceOptions());
