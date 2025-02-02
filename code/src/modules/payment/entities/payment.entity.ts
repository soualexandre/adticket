import { OrderEntity } from "src/modules/order/entities/order.entity";
import { PaymentMethod as PrismaPaymentMethod, PaymentStatus } from '@prisma/client';

export class PaymentEntity {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    method: PrismaPaymentMethod;
    transactionId: string | null;
    order: OrderEntity;
    createdAt: Date;
    updatedAt: Date;
}
