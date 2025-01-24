import { Batch } from 'src/modules/batch/entities/batch.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

export class Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    startTime: Date;
    image: string;
    batches: Batch[];
    tickets: Ticket[];
}