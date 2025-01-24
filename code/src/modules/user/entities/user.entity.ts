import { Ticket } from "src/modules/ticket/entities/ticket.entity";

export class User {
    id: string;
    email: string;
    phoneNumber: string;
    password: string;

    tickets: Ticket[]
}
