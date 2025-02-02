import { PaymentStatus } from "../entities/payment.entity";

export class WherePaymentDto {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
}