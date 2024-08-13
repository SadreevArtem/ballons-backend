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
    unique: false,
  })
  @Length(2, 30)
  name: string;
  @Column({ default: 'Описание продукта' })
  @Length(2, 200)
  description: string;
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  image: string;
  @Column()
  currentPrice: number;
  @Column({ default: 0 })
  oldPrice: number;
  @Column({ default: false })
  isSale: boolean;
  @Column({ default: false })
  isSelection: boolean;
  @Column({ default: false })
  published: boolean;
  @Column('text', { array: true, default: [] })
  tags: string[] | [];
  @Column({ default: 'all' })
  categories: Categories;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
