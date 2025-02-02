import { ValidationMethod } from "@prisma/client";

export class CreateTicketValidationDto {
    ticketId: string;
    validatedAt: Date;
    method: ValidationMethod;
    location: string | null;
}
