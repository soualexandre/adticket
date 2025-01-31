import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EVENT_TYPE_GATEWAY } from './gateway/event.type.gateway';
import { EventPrismaGateway } from './gateway/event.prisma.gateway';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    PrismaService,
    {
      provide: EVENT_TYPE_GATEWAY,
      useClass: EventPrismaGateway,
    },
  ],
})
export class EventsModule { }

