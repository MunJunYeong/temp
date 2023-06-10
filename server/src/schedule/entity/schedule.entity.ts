// lib
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  schedule_idx: number;

  @OneToOne(() => User)
  user: User;
}
