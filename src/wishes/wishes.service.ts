import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    // @InjectRepository(User)
    private readonly usersService: UsersService,
  ) {}

  findOne(query: FindOneOptions<Wish>) {
    return this.wishesRepository.findOneOrFail(query);
  }

  // + Запостить желание
  async create(createWishDto: CreateWishDto, userId: number): Promise<Wish> {
    const userOwner = await this.usersService.findById(userId);
    console.log(userId, userOwner);
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner: userOwner,
    });

    return this.wishesRepository.save(wish);
  }

  async getLastWishes() {
    const lastWishes = await this.wishesRepository.find({
      take: 40,
      order: {
        createdAt: 'DESC',
      },
      relations: ['owner', 'offers'],
    });
    return lastWishes;
  }

  async getTopWishes() {
    const topWishes = await this.wishesRepository.find({
      take: 20,
      order: {
        copied: 'DESC',
      },
      relations: ['owner', 'offers'],
    });
    return topWishes;
  }

  // + Найти желание по его id
  async getWishByWishId(wishId: number) {
    return await this.wishesRepository.findOne({
      where: { id: wishId }, // желание будет искаться по его айди
      // через слова-связки подтягиваю "владельца" желания (все его поля)
      // и тех, кто предложил скинуться на подарок
      relations: ['owner', 'offers'],
    });
  }

  async updateOne(updateWishDto: UpdateWishDto, wishId: number) {
    
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

    wish.copied++;
    this.wishesRepository.save(wish);

    return this.create(createWishDto, userId);
  }
}
