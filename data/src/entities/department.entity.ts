import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['deptno'])
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  deptno: number;

  @Column({ length: 14, nullable: true })
  dname: string;

  @Column({ length: 13, nullable: true })
  loc: string;
}
