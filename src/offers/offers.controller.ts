import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
// import { CreateOfferDto } from './dto/create-offer.dto';
// import { AuthUser } from 'src/utils/decorators/user.decorator';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // create(@Body() createOfferDto: CreateOfferDto, @AuthUser() user) {
  //   return this.offersService.create(createOfferDto, user.id);
  // }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOfferByOfferId(@Param('id') id: number) {
    return this.offersService.findOfferById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllOffers() {
    return this.offersService.getAllOffers();
  }
}
