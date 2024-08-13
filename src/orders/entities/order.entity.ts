import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: false,
  })
  @Length(2, 30)
  name: string;
  @Column({ unique: false })
  phone: string;
  @Column({ default: '' })
  orderString: string;
  @Column()
  adress: string;
  @Column({ default: 'коментарий' })
  comment: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
