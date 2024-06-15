import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { encrypt } from 'src/helpers/password-helpers.helper';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  // Регистрация
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: await encrypt(password),
    });
    return this.usersRepository.save(user);
  }

  // Этот метод будем использовать в методе авторизации
  // (он полностью возвращает объект пользователя)
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  // Этот метод будет использоваться в методе контроллера findOwn
  findOne(query: FindOneOptions<User>) {
    return this.usersRepository.findOneOrFail(query);
  }

  // Редактирование профайла пользователя
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const user = await this.findById(id);
    if (password) {
      updateUserDto.password = await encrypt(password);
    }

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  /*
  createUser(user: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }
  */
}
