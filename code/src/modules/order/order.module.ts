import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { OrderPrismaGateway } from './gateway/order.prisma.gateway';
import { ORDER_TYPE_GATEWAY } from './gateway/order.type.gateway';
import { OrdersService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrdersService, PrismaService,
    {
      provide: ORDER_TYPE_GATEWAY,
      useClass: OrderPrismaGateway,
    }
  ],
})
export class OrderModule { }