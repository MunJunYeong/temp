// lib
import { Schedule } from 'src/schedule/entity/schedule.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_idx: number;

  @Column()
  id: string;

  @Column()
  pw: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Schedule)
  schedule: Schedule;
}
