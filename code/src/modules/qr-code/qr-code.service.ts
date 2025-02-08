import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import { QR_CODE_TYPE_GATEWAY, QrCodeTypePrismaGateway } from './gateway/qr-code.type.gateway';
import { createHash } from 'node:crypto';

@Injectable()
export class QrCodesService {

  constructor(
    @Inject(QR_CODE_TYPE_GATEWAY) private readonly qrCodeGateway: QrCodeTypePrismaGateway,
  ) { }

  async create(createQrCodeDto: CreateQrCodeDto) {
    try {
      const hashUnique = await this.generateUniqueHash(createQrCodeDto.ticketId);
      const objectCreate: CreateQrCodeDto = {
        ticketId: createQrCodeDto.ticketId,
        linkHash: hashUnique,
        expiration: createQrCodeDto.expiration,
      }
      const qrCode = await this.qrCodeGateway.create(objectCreate);
      if (!qrCode) {
        throw new HttpException('QR Code not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return qrCode;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    try {
      const page = 1;
      const limit = 1000;
      const skip = (page - 1) * limit;
      const take = limit;
      return this.qrCodeGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const qrCode = this.qrCodeGateway.findOne(id);
      if (!qrCode) {
        throw new HttpException('QR Code not found', HttpStatus.NOT_FOUND);
      }
      return qrCode;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateQrCodeDto: UpdateQrCodeDto) {
    try {
      const qrCode = this.qrCodeGateway.update(id, updateQrCodeDto);
      if (!qrCode) {
        throw new HttpException('QR Code not found', HttpStatus.NOT_FOUND);
      }
      return qrCode;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.qrCodeGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('QR Code not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  generateUniqueHash(ticketId: string): string {
    const timestamp = Date.now().toString();
    const data = `${ticketId}-${timestamp}`;

    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }

  async generateQrCodeBase64(id: string) {
    try {
      const qrcode = await this.qrCodeGateway.generateQrCodeBase64(id);
      if (!qrcode) {
        throw new HttpException('QR Code not found', HttpStatus.NOT_FOUND);
      }
      return qrcode;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}