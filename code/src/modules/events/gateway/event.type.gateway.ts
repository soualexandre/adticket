import { CreateEventDto } from "../dto/create-event.dto";
import { PaginateEventOutputDto } from "../dto/paginate-event-dto";
import { UpdateEventDto } from "../dto/update-event.dto";
import { WhereEventDto } from "../dto/where-event-dto";
import { EventEntity } from "../entities/event.entity";

export const EVENT_TYPE_GATEWAY = 'EVENT_TYPE_GATEWAY';

export interface EventTypePrismaGateway {
    create(createEventDto: CreateEventDto): Promise<EventEntity>;
    findAll(skip: number, take: number, where?: WhereEventDto): Promise<PaginateEventOutputDto>
    findOne(id: string): Promise<EventEntity>;
    update(
        id: string,
        updateAdministratorDto: UpdateEventDto,
    ): Promise<EventEntity>;
    remove(id: string): Promise<boolean>;
}
