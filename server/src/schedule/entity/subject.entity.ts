import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Subject {
  @PrimaryColumn()
  subject_idx: number;

  @Column()
  name: string;

  @Column()
  day: number;

  @Column()
  time: string;

  @Column()
  description: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.subjects)
  schedule: Schedule;
}
