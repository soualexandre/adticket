import { EventEntity } from 'src/modules/events/entities/event.entity';
import { TicketEntity } from 'src/modules/ticket/entities/ticket.entity';

export class Batch {
    id: string;
    eventId: string;
    price: number;
    quantity: number;
    tickets: TicketEntity[];
    event: EventEntity;
    constructor(partial: Partial<Batch>) {
        Object.assign(this, partial);
    }
}