import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/guard/jwt.guard';
import { hashValue } from 'src/helpers/hash';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async findOwn(@AuthUser() user: User): Promise<User> {
    return this.usersService.findOne({
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: user.id },
    });
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  @UseFilters(EntityNotFoundFilter)
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findOne({
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { username },
    });
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  @UseFilters(EntityNotFoundFilter)
  async update(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    const { id } = user;
    const { password } = updateUserDto;
    return this.usersService.update(id, {
      ...updateUserDto,
      ...(Boolean(password) && { password: await hashValue(password) }),
    });
  }

  @UseGuards(JwtGuard)
  @Post('find')
  async findMany(@Body() find: { query: string }) {
    const users = await this.usersService.searchUsers(find.query);
    return users;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.usersService.remove(id, user);
  }
}
