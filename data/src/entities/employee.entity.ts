import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { DepartmentEntity } from './department.entity';

@Entity()
@Unique(['empno'])
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  empno: number;

  @Column({ length: 10 })
  ename: string;

  @Column({ length: 9 })
  job: string;

  @Column({ nullable: true })
  mgr: number;

  @Column()
  hiredate: Date;

  @Column('decimal', { precision: 7, scale: 2 })
  sal: number;

  @Column('decimal', { precision: 7, scale: 2, nullable: true })
  comm: number;

  @ManyToOne(() => DepartmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dept', referencedColumnName: 'deptno' })
  dept: DepartmentEntity;
}
