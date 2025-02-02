import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GuestPrismaGateway } from './gateway/guest.prisma.gateway';
import { GUEST_TYPE_GATEWAY } from './gateway/guest.type.gateway';
import { GuestsService } from './guest.service';

@Module({
  controllers: [GuestController],
  providers: [GuestsService, PrismaService,
    {
      provide: GUEST_TYPE_GATEWAY,
      useClass: GuestPrismaGateway,
    }
  ],
})
export class GuestModule { }