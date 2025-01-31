import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketPrismaGateway } from './gateway/ticket.prisma.gateway';
import { TICKET_TYPE_GATEWAY } from './gateway/ticket.type.gateway';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [TicketController],
  providers: [
    TicketService,
    PrismaService,
    {
      provide: TICKET_TYPE_GATEWAY,
      useClass: TicketPrismaGateway,
    }

  ],
})
export class TicketModule { }
