import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
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
