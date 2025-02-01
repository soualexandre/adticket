import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './common/guard/jwt-auth/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BatchModule } from './modules/batch/batch.module';
import { AppCacheModule } from './modules/cache/cache.module';
import { RedisOptions } from './modules/cache/redis-store';
import { EventsModule } from './modules/events/events.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserPrismaGateway } from './modules/user/gateway/user.prisma.gateway';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }),
    TicketModule, AppCacheModule, EventsModule,
    UserModule, BatchModule, AuthModule, CacheModule.register(),
  ConfigModule.forRoot({ isGlobal: true }),
  CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AppController],
  providers: [AppService, UserPrismaGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
export class AppModule { }
