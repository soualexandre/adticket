import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.sinIn(createAuthDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
