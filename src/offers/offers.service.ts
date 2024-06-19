import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
// import { CreateOfferDto } from './dto/create-offer.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // async create(createOfferDto: CreateOfferDto, userId: number) {
  //   const { amount, itemId } = createOfferDto;

  //   const owner = await this.usersService.findById(userId); // из токена достаю пользователя
  //   const wish = await this.wishesService.findById(itemId); // из тела запроса достаю wish

  //   const raised = wish.raised + amount;

  //   if (raised > wish.price) {
  //     throw new Error('The offer amount is more than the amount left to raise');
  //   }

  //   wish.raised += amount;

  //   await this.wishesService.set(itemId, { raised });

  //   return this.offersRepository.save({
  //     ...createOfferDto,
  //     owner,
  //     amount,
  //     item: wish,
  //   });
  // }

  // findMany(query: FindManyOptions<Offer>) {
  //   return this.offerRepository.find(query);
  // }

  async getAllOffers(): Promise<Offer[]> {
    const offers = await this.offersRepository.find({
      relations: ['user'],
    });
    return offers;
  }

  // findOne(query: any) {
  //   return this.offerRepository.findOneOrFail(query);
  // }

  async findOfferById(offerId: number): Promise<Offer> {
    const offer = this.offersRepository.findOne({
      where: { id: offerId },
      relations: ['user', 'item'],
    });
    if (!offer) {
      throw new Error('Requested offer was not found');
    }

    return offer;
  }

  findById(id: number) {
    return this.offersRepository.findOneOrFail({ where: { id } });
  }
}
