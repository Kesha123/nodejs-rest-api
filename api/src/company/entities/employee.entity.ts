import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { DepartmentEntity } from './department.entity';

@Entity()
@Unique(['empno'])
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  empno: number;

  @Column({ length: 10 })
  @AutoMap()
  ename: string;

  @Column({ length: 9 })
  @AutoMap()
  job: string;

  @Column({ nullable: true })
  @AutoMap()
  mgr: number;

  @Column()
  @AutoMap()
  hiredate: Date;

  @Column('decimal', { precision: 7, scale: 2 })
  @AutoMap()
  sal: number;

  @Column('decimal', { precision: 7, scale: 2, nullable: true })
  @AutoMap()
  comm: number;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'dept' })
  @AutoMap()
  dept: number;
}
