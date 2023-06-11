// lib
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  schedule_idx: number;

  // subject의 pk = schedule_idx
  @OneToMany(()=> Subject, (subject)=> subject.subject_idx)
  subjects: Subject[]

  @OneToOne(() => User, (user)=> user.schedule)
  user: User;
}
