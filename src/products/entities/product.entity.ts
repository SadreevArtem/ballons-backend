import { Length } from 'class-validator';
import { Categories } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  @Length(2, 30)
  name: string;
  @Column()
  @Length(2, 200)
  description: string;
  @Column()
  image: string;
  @Column()
  currentPrice: number;
  @Column()
  oldPrice: number;
  @Column()
  isSale: boolean;
  @Column()
  isSelection: boolean;
  @Column()
  published: boolean;
  @Column()
  tags: string[] | [];
  @Column()
  categories: Categories;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
