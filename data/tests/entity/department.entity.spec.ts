import { DataSource } from 'typeorm';
import { createPgMemDataSource } from '../utils/pgmem-datasource.utils';

describe('Entities (pg-mem)', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await createPgMemDataSource();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create and retrieve a Department', async () => {
    const repo = dataSource.getRepository('DepartmentEntity');
    const dept = repo.create({ dname: 'IT', loc: 'HQ' });
    await repo.save(dept);

    const found = await repo.findOneBy({ deptno: dept.deptno });
    expect(found).toBeDefined();
    expect(found?.dname).toBe('IT');
  });
});
