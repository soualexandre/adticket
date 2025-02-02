import { BatchEntity } from "src/modules/batch/entities/batch.entity";
import { GuestEntity } from "src/modules/guest/entities/guest.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { TicketLinkEntity } from "src/modules/ticket-link/entities/ticket-link.entity";
import { TicketValidationsEntity } from "src/modules/ticket-validation/entities/ticket-validation.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

export enum TicketStatus {
    PENDING,
    ASSIGNED,
    USED,
    CANCELLED
}

export class TicketEntity {
    id: string;
    eventId: string;
    batchId: string;
    orderId: string;
    buyerId: string;
    userId: string | null;
    guestId: string | null;
    price: number;
    status: TicketStatus;
    event: Event;
    batch: BatchEntity;
    order: OrderEntity;
    user: UserEntity | null;
    buyer: UserEntity;
    guest: GuestEntity | null;
    link: TicketLinkEntity | null;
    ticketValidations: TicketValidationsEntity[];
    createdAt: Date;
    updatedAt: Date;
}