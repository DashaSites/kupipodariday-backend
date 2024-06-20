import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  // + Создать вишлист
  async create(createWishlistDto: CreateWishlistDto, user: User): Promise<Wishlist> {
    const { itemsId } = createWishlistDto;
    const myWishes = await this.wishesService.getWishesArrayByWishesId(itemsId);
    console.log(myWishes);

    if (myWishes?.length === 0) {
      throw new Error('A wishlist has to contain wishes in order to be created');
    }

    const myWishlist = await this.wishlistsRepository.save({
      ...createWishlistDto,
      items: myWishes,
      owner: user,
    });

    return myWishlist;
  } 

  // + Показать все вишлисты
  async getAllWishlists(): Promise<Wishlist[]> {
    const wishlists = await this.wishlistsRepository.find({
      relations: ['items', 'owner']
    });
    return wishlists;
  }
}
