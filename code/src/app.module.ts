import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './modules/ticket/ticket.module';
import { EventsModule } from './modules/events/events.module';
import { UserModule } from './modules/user/user.module';
import { BatchModule } from './modules/batch/batch.module';
import { UserPrismaGateway } from './modules/user/gateway/user.prisma.gateway';
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), TicketModule, EventsModule, UserModule, BatchModule],
  controllers: [AppController],
  providers: [AppService, UserPrismaGateway],
})
export class AppModule { }
