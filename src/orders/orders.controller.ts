import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }
  @Post()
  async create(@Body() createOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
  }
}
