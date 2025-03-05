import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
@Unique(['deptno'])
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  deptno: number;

  @Column({ length: 14, nullable: true })
  @AutoMap()
  dname: string;

  @Column({ length: 13, nullable: true })
  @AutoMap()
  loc: string;
}
