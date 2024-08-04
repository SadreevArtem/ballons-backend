import { IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
