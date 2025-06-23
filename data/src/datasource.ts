import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

export const getDataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, './entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations', '**', '*.ts')],
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(join(__dirname, '../ssl/ca.crt')).toString(),
    // key: fs.readFileSync(join(__dirname, '../ssl/server.key')).toString(),
    // cert: fs.readFileSync(join(__dirname, '../ssl/server.crt')).toString(),
  },
});

export const ApiDataSource = new DataSource(getDataSourceOptions());
