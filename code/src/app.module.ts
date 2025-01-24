import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './modules/ticket/ticket.module';
import { EventsModule } from './modules/events/events.module';
import { UserModule } from './modules/user/user.module';
import { BatchModule } from './modules/batch/batch.module';

@Module({
  imports: [TicketModule, EventsModule, UserModule, BatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
