import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    private readonly usersService: UsersService,
  ) {}

  // + Запостить желание
  async create(createWishDto: CreateWishDto, userId: number) {
    const owner = await this.usersService.findById(userId);
    console.log(userId, owner);
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner,
    });

    return this.wishesRepository.save(wish);
  }

  // + Найдем массив всех желаний данного пользователя (например мои)
  async findWishById(ownerId: number) {
    return await this.wishesRepository.find({
      where: { owner: { id: ownerId } }, // массив будет искаться по полю owner
      relations: ['owner'],
    });
  }

  // Скопировать к себе желание
  async copy(wishId: number, userId: number) {
    const wish = await this.wishesRepository.findOneOrFail({
      where: { id: wishId },
    });
    const createWishDto: CreateWishDto = {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    };

    return this.create(createWishDto, userId);
  }
}
