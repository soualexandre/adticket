import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BATCH_TYPE_GATEWAY } from './gateway/batch.type.gateway';
import { BatchPrismaGateway } from './gateway/batch.prisma.gateway';

@Module({
  controllers: [BatchController],
  providers: [
    BatchService,
    PrismaService,
    {
      provide: BATCH_TYPE_GATEWAY,
      useClass: BatchPrismaGateway,
    }
  ],
})
export class BatchModule { }
