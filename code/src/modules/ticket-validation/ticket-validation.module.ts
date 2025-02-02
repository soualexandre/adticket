import { Module } from '@nestjs/common';
import { TicketValidationController } from './ticket-validation.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TICKET_VALIDATION_TYPE_GATEWAY } from './gateway/ticket-validation.type.gateway';
import { TicketValidationPrismaGateway } from './gateway/ticket-validation.prisma.gateway';
import { TicketValidationService } from './ticket-validation.service';

@Module({
  controllers: [TicketValidationController],
  providers: [TicketValidationService, PrismaService,
    {
      provide: TICKET_VALIDATION_TYPE_GATEWAY,
      useClass: TicketValidationPrismaGateway,
    }
  ],
})
export class TicketValidationModule { }