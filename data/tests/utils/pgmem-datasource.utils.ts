import { newDb } from 'pg-mem';
import { DepartmentEntity } from '../../src/entities/department.entity';
import { EmployeeEntity } from '../../src/entities/employee.entity';
import { DataSource } from 'typeorm';

export const createPgMemDataSource = async () => {
  const db = newDb({ autoCreateForeignKeyIndices: true });
  db.public.registerFunction({
    name: 'current_database',
    implementation: () => 'pg-mem',
  });

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [EmployeeEntity, DepartmentEntity],
    synchronize: true,
    logging: false,
  });

  db.adapters.createTypeormDataSource(dataSource);

  await dataSource.initialize();
  return dataSource;
};
