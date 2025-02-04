import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { QrCodePrismaGateway } from './gateway/qr-code.prisma.gateway';
import { QR_CODE_TYPE_GATEWAY } from './gateway/qr-code.type.gateway';
import { QrCodeController } from './qr-code.controller';
import { QrCodesService } from './qr-code.service';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodesService, PrismaService,
    {
      provide: QR_CODE_TYPE_GATEWAY,
      useClass: QrCodePrismaGateway,
    }
  ],
})
export class QrCodeModule { }
