import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketPrismaGateway } from './gateway/ticket.prisma.gateway';
import { TICKET_TYPE_GATEWAY } from './gateway/ticket.type.gateway';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { EVENT_TYPE_GATEWAY } from '../events/gateway/event.type.gateway';
import { EventPrismaGateway } from '../events/gateway/event.prisma.gateway';
import { SqsCustomModule } from '../sqs/sqs.module';
import { SqsService } from '../sqs/sqs.service';

@Module({
  imports: [SqsCustomModule],
  controllers: [TicketController],
  providers: [
    TicketService,
    SqsService,
    PrismaService,
    EventPrismaGateway,

    {
      provide: EVENT_TYPE_GATEWAY,
      useClass: EventPrismaGateway,
    },
    {
      provide: TICKET_TYPE_GATEWAY,
      useClass: TicketPrismaGateway,
    }

  ],
})
export class TicketModule { }
