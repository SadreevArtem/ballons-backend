import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegrammService } from 'src/telegramm/telegramm.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly telegrammService: TelegrammService,
  ) {}
  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ order: { createdAt: 'DESC' } });
  }

  async create(createOrderDto: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.save(createOrderDto);
    await this.telegrammService.sendMessage(
      +process.env.TELEGRAMM_CHAT || 0,
      `
      ${order.name}\n
      ${order.adress}\n
      ${order.phone}\n
      ${order.orderString}\n
      ${order.comment}\n
      ${order.createdAt.toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })}\n`,
    );
    return order;
  }
  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
