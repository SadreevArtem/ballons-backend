import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  about: string;
  @IsOptional()
  @IsUrl()
  avatar: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
