import { OrderStatus } from "../entities/order.entity";

export class WhereOrderDto {
    id: string;
    userId: string;
    totalAmount: number;
    status: OrderStatus;
}