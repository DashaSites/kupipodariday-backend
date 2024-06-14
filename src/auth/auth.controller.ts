import { Controller } from '@nestjs/common';
// import { AuthUser } from 'src/utils/decorators/user.decorator';
import { AuthService } from './auth.service';

// import { Wish } from 'src/wishes/entities/wish.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }
  */
}
