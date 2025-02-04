import { CreateQrCodeDto } from "../dto/create-qr-code.dto";
import { PaginateQrCodeOutputDto } from "../dto/paginate-qr-code-dto";
import { UpdateQrCodeDto } from "../dto/update-qr-code.dto";
import { WhereQrCodeDto } from "../dto/where-qr-code-dto";
import { QrCodeEntity } from "../entities/qr-code.entity";

export const QR_CODE_TYPE_GATEWAY = 'QR_CODE_TYPE_GATEWAY';

export interface QrCodeTypePrismaGateway {
    create(createQrCodeDto: CreateQrCodeDto): Promise<QrCodeEntity>;
    findAll(skip: number, take: number, where?: WhereQrCodeDto): Promise<PaginateQrCodeOutputDto>;
    findOne(id: string): Promise<QrCodeEntity>;
    update(
        id: string,
        updateQrCodeDto: UpdateQrCodeDto,
    ): Promise<QrCodeEntity>;
    remove(id: string): Promise<boolean>;
    generateQrCodeBase64(id: string): Promise<Base64URLString>
}