import { OrderStatus } from "@prisma/client";

export class WhereOrderDto {
    id: string;
    userId: string;
    totalAmount: number;
    status: OrderStatus;
}