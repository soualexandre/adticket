import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

export enum OrderStatus {
    PENDING,
    PAID,
    CANCELLED
}
export class OrderEntity {
    id: string;
    userId: string;
    totalAmount: number;
    status: OrderStatus;
    user: UserEntity;
    tickets: TicketEntity[];
    payments: PaymentEntity[];
    createdAt: Date;
    updatedAt: Date;
}
