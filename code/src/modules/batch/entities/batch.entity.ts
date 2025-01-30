import { Event } from 'src/modules/events/entities/event.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

export class Batch {
    id: string;
    eventId: string;
    price: number;
    quantity: number;
    tickets: Ticket[];
    event: Event;
    constructor(partial: Partial<Batch>) {
        Object.assign(this, partial);
    }
}