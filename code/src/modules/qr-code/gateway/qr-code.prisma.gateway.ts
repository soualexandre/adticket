import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateQrCodeDto } from '../dto/create-qr-code.dto';
import { PaginateQrCodeOutputDto } from '../dto/paginate-qr-code-dto';
import { UpdateQrCodeDto } from '../dto/update-qr-code.dto';
import { QrCodeTypePrismaGateway } from './qr-code.type.gateway';
import { QrCodeEntity } from '../entities/qr-code.entity';
import { WhereQrCodeDto } from '../dto/where-qr-code-dto';
import * as QRCode from 'qrcode';
@Injectable()
export class QrCodePrismaGateway implements QrCodeTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createQrCodeDto: CreateQrCodeDto): Promise<QrCodeEntity> {
    const qrCode = await this.prisma.qrCode.create({
      data: {
        ...createQrCodeDto,
      },
    });
    return this.mapToQrCodeEntity(qrCode);
  }

  async findAll(skip: number, take: number, where?: WhereQrCodeDto): Promise<PaginateQrCodeOutputDto> {
    const qrCodes = await this.prisma.qrCode.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.qrCode.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: qrCodes.map(qrCode => this.mapToQrCodeEntity(qrCode)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<QrCodeEntity> {
    const qrCode = await this.prisma.qrCode.findFirst({
      where: { id },
    });
    return this.mapToQrCodeEntity(qrCode);
  }

  async update(id: string, updateQrCodeDto: UpdateQrCodeDto): Promise<QrCodeEntity> {
    const qrCode = await this.prisma.qrCode.update({
      where: { id },
      data: updateQrCodeDto,
    });

    return this.mapToQrCodeEntity(qrCode);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.qrCode.delete({
      where: { id },
    });

    return true;
  }

  async generateQrCodeBase64(id: string): Promise<string> {
    const qrCode = await this.prisma.qrCode.findFirst({
      where: { id },
    });

    if (!qrCode) {
      throw new Error('QR Code not found');
    }

    const url = `http://localhost/${qrCode.linkHash}/qrcode`;

    const qrCodeBase64 = await QRCode.toDataURL(url);

    return qrCodeBase64;
  }

  private mapToQrCodeEntity(qrCode: any): QrCodeEntity {
    return {
      id: qrCode.id,
      status: qrCode.status,
      ticket: qrCode.ticket,
      ticketId: qrCode.ticketId,
      linkHash: qrCode.linkHash,
      expiration: qrCode.expiration,
      createdAt: qrCode.createdAt,
      updatedAt: qrCode.updatedAt,
    };
  }
}