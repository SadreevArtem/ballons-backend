import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Categories } from 'src/types';

export class CreateProductDto {
  @IsString()
  @Length(2, 30)
  name: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  description: string;
  @IsOptional()
  @IsUrl()
  image: string;
  @IsOptional()
  @IsNumber()
  currentPrice: number;
  @IsOptional()
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
