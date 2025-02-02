import { LinkStatus } from "@prisma/client";
import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";

export class TicketLinkEntity {
    id: string;
    ticketId: string;
    linkHash: string;
    expiration: Date;
    status: LinkStatus;
    ticket: TicketEntity;
    createdAt: Date;
    updatedAt: Date;
}
