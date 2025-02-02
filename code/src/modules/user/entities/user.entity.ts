import { OrderEntity } from "src/modules/order/entities/order.entity";
import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";

export class UserEntity {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    password: string;

    tickets?: TicketEntity[];
    orders: OrderEntity[];
    boughtTickets: TicketEntity[];
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}

