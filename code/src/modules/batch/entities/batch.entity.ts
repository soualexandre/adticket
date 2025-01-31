import { EventEntity } from 'src/modules/events/entities/event.entity';
import { TicketEntity } from 'src/modules/ticket/entities/ticket.entity';

export class BatchEntity {
    id: string;
    eventId: string;
    price: number;
    quantity: number;
    tickets: TicketEntity[];
    event: EventEntity;
    constructor(partial: Partial<BatchEntity>) {
        Object.assign(this, partial);
    }
}