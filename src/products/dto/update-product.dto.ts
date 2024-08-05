import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { Categories } from 'src/types';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  @Length(2, 30)
  name: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  description: string;
  @IsOptional()
  @IsUrl()
  image: string;
  @IsNumber()
  currentPrice: number;
  @IsNumber()
  oldPrice: number;
  @IsBoolean()
  isSale: boolean;
  @IsBoolean()
  isSelection: boolean;
  @IsBoolean()
  published: boolean;
  @IsString({ each: true })
  tags: string[] | [];
  @IsString()
  categories: Categories;
}
