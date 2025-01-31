import { Batch } from "src/modules/batch/entities/batch.entity";
import { TicketEntity } from "src/modules/ticket/entities/ticket.entity";

export class UserEntity {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    password: string;

    tickets?: TicketEntity[];

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
