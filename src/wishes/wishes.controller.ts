import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
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

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  copy(@Param() params: any, @AuthUser() user) {
    return this.wishesService.copy(params.id, user.id);
  }

  // @Get()

  // @Patch()

  // @Delete()
}
