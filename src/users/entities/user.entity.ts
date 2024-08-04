import { IsEmail, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;
  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;
  @Column({ select: false })
  password: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
