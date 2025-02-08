import { CreateTicketDto } from '../dto/create-ticket.dto';
import { PaginateTicketOutputDto } from '../dto/paginate-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { WhereTicketDto } from '../dto/where-ticket.dto';
import { TicketEntity } from '../entities/ticket.entity';

export const TICKET_TYPE_GATEWAY = 'TICKET_TYPE_GATEWAY';

export interface TicketTypePrismaGateway {
    create(createUserDto: CreateTicketDto[]): Promise<TicketEntity[]>;
    findAll(skip: number, take: number, where?: WhereTicketDto): Promise<PaginateTicketOutputDto>
    findOne(id: string, where?: WhereTicketDto): Promise<TicketEntity>;
    update(
        id: string,
        updateAdministratorDto: UpdateTicketDto,
        where?: WhereTicketDto,
    ): Promise<TicketEntity>;
    remove(id: string): Promise<boolean>;
}
