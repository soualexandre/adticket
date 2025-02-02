import { Module } from '@nestjs/common';
import { TicketLinkController } from './ticket-link.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TicketLinksService } from './ticket-link.service';
import { TICKET_LINK_TYPE_GATEWAY } from './gateway/ticketLink.type.gateway';
import { TicketLinkPrismaGateway } from './gateway/ticketLink.prisma.gateway';

@Module({
  controllers: [TicketLinkController],
  providers: [TicketLinksService, PrismaService,
    {
      provide: TICKET_LINK_TYPE_GATEWAY,
      useClass: TicketLinkPrismaGateway,
    }
  ],
})
export class TicketLinkModule { }