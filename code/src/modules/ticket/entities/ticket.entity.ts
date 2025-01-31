import { Batch } from "src/modules/batch/entities/batch.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

export class TicketEntity {
    id: string;
    eventId: string;
    batchId: string;
    userId: string;
    price: number;
    quantity: number;
    totalPrice: number;
    event: Event;
    batch: Batch;
    user: UserEntity;
}