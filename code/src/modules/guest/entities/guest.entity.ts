import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";

export class GuestEntity {
    id: string;
    name: string;
    email: string | null;
    phoneNumber: string | null;
    tickets: TicketEntity[];
    createdAt: Date;
    updatedAt: Date;
}
