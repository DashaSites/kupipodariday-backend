import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/utils/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ILike } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  // Кастомный декторатор @AuthUser надо использовать там, где нужна
  // информация об авторизованном пользователе. Он возвращает объект пользователя

  // + Нахожу всех пользователей
  @Get('all')
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // + Возвращаю инфу о себе (авторизованном пользователе)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOne(@AuthUser() user: User): Promise<User> {
    // findOne - метод, описанный внутри сервиса UsersService
    return this.usersService.findOne({
      where: { id: user.id }, // без @AuthUser было бы { id: req.user.id }
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Вернуть все мои желания
  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async findMyWishes(@AuthUser() user: User): Promise<Wish[]> {
    return await this.wishesService.findWishById(user.id);
  }

  // + Редактировать мой профиль
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  // @UseFilters(EntityNotFoundFilter)
  async updateMyProfile(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(user);
    const { id } = user;
    return this.usersService.updateMyProfile(id, updateUserDto);
  }

  // Найти профиль по имени пользователя
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.usersService.findOne({
      // ILike делает typeorm-запросы нечувствительными к регистру
      where: { username: ILike(username) },
      select: {
        id: true,
        username: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Найти все желания определенного пользователя
  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  findUserWishesByUsername(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }
}
