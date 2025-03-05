import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';

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
  entities: [join(__dirname, 'company/entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '**', '*.ts')],
});

export const ApiDataSource = new DataSource(getDataSourceOptions());
