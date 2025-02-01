import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserPrismaGateway } from '../user/gateway/user.prisma.gateway';
import { CacheService } from '../cache/cache.service';
import { jwtConstants } from 'src/common/constants/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, CacheService, UserPrismaGateway],

  exports: [AuthService],
})
export class AuthModule { }
