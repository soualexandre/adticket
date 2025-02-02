import { OrderEntity } from "src/modules/order/entities/order.entity";

export enum PaymentStatus {
    PENDING,
    CONFIRMED,
    FAILED
}
export enum PaymentMethod {
    CREDIT_CARD,
    PIX,
    BOLETO,
    PAYPAL
}
export class PaymentEntity {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    transactionId: string | null;
    order: OrderEntity;
    createdAt: Date;
    updatedAt: Date;
}
