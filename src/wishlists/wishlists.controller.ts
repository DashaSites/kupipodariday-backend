import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Wishlist } from './entities/wishlist.entity';
import { AuthUser } from 'src/utils/decorators/user.decorator';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  // + Создать вишлист
  @Post()
  @UseGuards(JwtAuthGuard)
  createWishlist(
    @Body() createWishlistDto: CreateWishlistDto,
    @AuthUser() user: User,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, user);
  }

  // + Все вишлисты
  @Get()
  @UseGuards(JwtAuthGuard)
  findAllWishlists(): Promise<Wishlist[]> {
    return this.wishlistsService.getAllWishlists();
  }

  

  // @Patch()

  // @Delete()
}
