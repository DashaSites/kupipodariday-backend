import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { AuthUser } from 'src/utils/decorators/user.decorator';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // + Запостить желание
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createWishDto: CreateWishDto, @AuthUser() user) {
    return this.wishesService.create(createWishDto, user.id);
  }
  // + Возвращает список из 40 подарков, добавленных недавно
  @Get('last')
  findLastWishes() {
    return this.wishesService.getLastWishes();
  }

  // + Возвращает 20 подарков, которые копируют в свой профиль чаще всего
  @Get('top')
  findTopWishes() {
    return this.wishesService.getTopWishes();
  }

  // + Найти подарок по его id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findWishByWishId(@Param('id') id: number) {
    return this.wishesService.getWishByWishId(id);
  }

  // Копирует желание к себе
  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  copy(@Param() params: any, @AuthUser() user) {
    return this.wishesService.copy(params.id, user.id);
  }

  // !!! Сделать
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateWishById(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @AuthUser() user: User,
  ) {
    const userId = user.id;
    return this.wishesService.updateWish(id, updateWishDto, userId);
  }

  // !!! Сделать
  // @Delete()
}
