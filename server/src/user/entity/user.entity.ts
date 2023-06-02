
// lib
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
