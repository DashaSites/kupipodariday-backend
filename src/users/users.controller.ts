import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/utils/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  // Кастомный декторатор @AuthUser надо использовать там, где нужна
  // информация об авторизованном пользователе. Он возвращает объект пользователя

  @Get('all')
  getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // + Возвращаю инфу о себе (авторизованном пользователе)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOwn(@AuthUser() user: User): Promise<User> {
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

  @Get('me/wishes')
  async findMyWishes(@AuthUser() user: User): Promise<Wish[]> {
    return await this.wishesService.findWishById(user.id);
  }

  @Patch('me')
  // @UseFilters(EntityNotFoundFilter)
  async updateOne(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = user;
    return this.usersService.update(id, updateUserDto);
  }
}
