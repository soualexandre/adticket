import { PaymentEntity } from "../entities/payment.entity";

export class PaginatePaymentOutputDto {
    data: PaymentEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}