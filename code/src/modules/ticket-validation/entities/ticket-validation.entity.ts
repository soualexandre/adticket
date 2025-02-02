import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";
enum ValidationMethod {
    QR_CODE,
    PIN,
    NFC
}

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
