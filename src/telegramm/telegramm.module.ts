import { Module } from '@nestjs/common';
import { TelegrammService } from './telegramm.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [TelegrammService, UsersService],
})
export class TelegrammModule {}
