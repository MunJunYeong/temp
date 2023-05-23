import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_idx: number;

  @Column()
  id: number;

  @Column()
  pw: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
