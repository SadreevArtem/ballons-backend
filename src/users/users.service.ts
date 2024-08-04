import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, FindOneOptions, Like, Repository } from 'typeorm';
import { hashValue } from 'src/helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private async userExists(createUserDto: CreateUserDto): Promise<boolean> {
    return !!(await this.userRepository.findOne({
      where: [
        { username: Equal(createUserDto.username) },
        { email: Equal(createUserDto.email) },
      ],
    }));
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.userExists(createUserDto)) {
      throw new BadRequestException(
        'Пользователь с указанными данными уже существует',
      );
    }
    const { password } = createUserDto;
    return this.userRepository.save({
      ...createUserDto,
      password: await hashValue(password),
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }

  findOneQuery(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  searchUsers(query: string) {
    return this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (await this.userExists(updateUserDto)) {
      throw new BadRequestException(
        'Пользователь с указанными данными уже зарегистрирован',
      );
    }
    return this.userRepository.update({ id }, updateUserDto);
  }
  remove(id: number, user) {
    if (user.id !== 1) {
      throw new ForbiddenException('Запрещено');
    }
    return this.userRepository.delete({ id });
  }
}
