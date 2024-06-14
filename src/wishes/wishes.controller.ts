import { Body, Controller, Post } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { AuthUser } from 'src/utils/decorators/user.decorator';
import { CreateWishDto } from './dto/create-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto, @AuthUser() user) {
    return this.wishesService.create(createWishDto, user.id);
  }

  // @Get()

  // @Patch()

  // @Delete()
}
