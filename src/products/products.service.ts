import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from 'src/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { createdAt: 'DESC' } });
  }

  getProductsByCategories(category: Categories): Promise<Product[]> {
    return this.productRepository.find({
      where: { categories: category === 'all' ? '' : category },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(options: FindOneOptions<Product>) {
    return this.productRepository.find(options);
  }

  searchProducts(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id } });
  }
  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }
  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ id }, updateProductDto);
  }
  remove(id: number) {
    return this.productRepository.delete({ id });
  }
}
