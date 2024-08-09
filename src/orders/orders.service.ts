import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ order: { createdAt: 'DESC' } });
  }

  create(createOrderDto: Partial<Order>): Promise<Order> {
    return this.orderRepository.save(createOrderDto);
  }
  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
