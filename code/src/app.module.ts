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
import { TicketLinkModule } from './modules/ticket-link/ticket-link.module';
import { TicketValidationModule } from './modules/ticket-validation/ticket-validation.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { GuestModule } from './modules/guest/guest.module';
import { QrCodeModule } from './modules/qr-code/qr-code.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SqsService } from './modules/sqs/sqs.service';
import { SqsCustomModule } from './modules/sqs/sqs.module';
import { TicketConsumerService } from './modules/ticket/ticket.consumer.service';
import { TICKET_TYPE_GATEWAY } from './modules/ticket/gateway/ticket.type.gateway';
import { TicketPrismaGateway } from './modules/ticket/gateway/ticket.prisma.gateway';
import { MercadoPagoModule } from './modules/geteways/mercado-pago/mercado-pago.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TicketModule, AppCacheModule, EventsModule,
    UserModule, BatchModule, AuthModule, CacheModule.register(),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    GuestModule,
    TicketValidationModule,
    OrderModule,
    PaymentModule,
    TicketLinkModule,
    TicketValidationModule,
    QrCodeModule,
    CategoriesModule,
    SqsCustomModule,
    MercadoPagoModule
  ],
  exports: [
    TicketLinkModule,
    TicketValidationModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserPrismaGateway,
    TicketConsumerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: TICKET_TYPE_GATEWAY,
      useClass: TicketPrismaGateway,
    },

    SqsService],
})
export class AppModule { }
