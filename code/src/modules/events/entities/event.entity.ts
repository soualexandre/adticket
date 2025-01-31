import { Batch } from 'src/modules/batch/entities/batch.entity';
import { TicketEntity } from 'src/modules/ticket/entities/ticket.entity';

export class EventEntity {
    id: string;
    title: string;
    description: string;
    date: Date;
    startTime: Date;
    image: string;
    batches?: Batch[];
    tickets?: TicketEntity[];
    constructor(partial: Partial<Event>) {
        Object.assign(this, partial);
    }
}