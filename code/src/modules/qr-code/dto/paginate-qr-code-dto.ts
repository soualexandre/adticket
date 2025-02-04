import { QrCodeEntity } from "../entities/qr-code.entity";

export class PaginateQrCodeOutputDto {
    data: QrCodeEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}