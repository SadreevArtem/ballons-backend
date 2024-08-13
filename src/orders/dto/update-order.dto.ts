import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsOptional()
  @Length(2, 30)
  name: string;
  @IsString()
  @IsOptional()
  phone: string;
  @IsString()
  @IsOptional()
  orderString: string;
  @IsOptional()
  @IsNumber()
  adress: string;
  @IsOptional()
  @IsNumber()
  comment: string;
}
