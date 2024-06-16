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

  // + Нахожу всех пользователей
  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  // + Регистрация
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: await encrypt(password),
    });
    return this.usersRepository.save(user);
  }

  // + Этот метод используется в методе авторизации в JwtStrategy
  // (он полностью возвращает объект пользователя)
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  // + Метод нахождения пользователя: используется в методе контроллера findOwn
  // FindOneOptions - это специальный тип, который возвращает объект, соответствующий
  // структуре с where и select из запроса
  findOne(query: FindOneOptions<User>) {
    return this.usersRepository.findOneOrFail(query);
  }

  // + Редактирование профайла пользователя
  async updateMyProfile(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const user = await this.findById(id);
    if (password) {
      updateUserDto.password = await encrypt(password);
    }

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ // нужно обращаться к репозиторию?
      where: {

      }
    });
    // здесь надо видимо использовать where и найти его по username
  }
}
