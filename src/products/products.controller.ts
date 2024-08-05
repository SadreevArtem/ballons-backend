import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findById(+id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto) {
    await this.productsService.update(+id, updateProductDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
  }
  @Post('search')
  async search(@Body() find: { query: string }) {
    return this.productsService.searchProducts(find.query);
  }
}
