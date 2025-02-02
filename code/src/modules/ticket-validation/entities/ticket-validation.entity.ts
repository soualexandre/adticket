import { ValidationMethod } from "@prisma/client";
import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";

export class TicketValidationsEntity {
    id: string;
    ticketId: string;
    validatedAt: Date;
    method: ValidationMethod;
    location: string | null;
    ticket: TicketEntity;
    createdAt: Date;
    updatedAt: Date;
}
