import { PaymentMethod } from "@prisma/client";

export class CreatePaymentDto {
    orderId: string;
    amount: number;
    method: PaymentMethod;
    transactionId: string | null;
}
