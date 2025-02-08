import { EventEntity } from "src/modules/events/entities/event.entity";

export class CategoryEntity {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    event: EventEntity;
    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial);
    }
}
