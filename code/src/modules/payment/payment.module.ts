import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PaymentPrismaGateway } from './gateway/payment.prisma.gateway';
import { PAYMENT_TYPE_GATEWAY } from './gateway/payment.type.gateway';
import { PaymentsService } from './payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentsService, PrismaService,
    {
      provide: PAYMENT_TYPE_GATEWAY,
      useClass: PaymentPrismaGateway,
    }
  ],
})
export class PaymentModule { }