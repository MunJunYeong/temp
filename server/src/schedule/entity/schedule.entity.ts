import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  class_idx: number;

  @Column()
  name: string;

  @Column()
  day: string;

  @Column()
  starttime: number;

  @Column()
  endtime: number;
}
