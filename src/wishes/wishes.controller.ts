import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { AuthUser } from 'src/utils/decorators/user.decorator';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // + Запостить желание
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createWishDto: CreateWishDto, @AuthUser() user) {
    return this.wishesService.create(createWishDto, user.id);
  }
  // Возвращает список из 40 подарков, добавленных недавно
  @Get('last')
  findLastWishes() {
    return this.wishesService.getLastWishes();
  }

  // Возвращает 20 подарков, которые копируют в свой профиль чаще всего
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

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  copy(@Param() params: any, @AuthUser() user) {
    return this.wishesService.copy(params.id, user.id);
  }

  // @Get()

  // @Patch()

  // @Delete()
}
