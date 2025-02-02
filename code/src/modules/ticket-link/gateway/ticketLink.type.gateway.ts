import { CreateTicketLinkDto } from '../dto/create-ticket-link.dto';
import { PaginateTicketLinkOutputDto } from '../dto/paginate-ticket-link.dto';
import { UpdateTicketLinkDto } from '../dto/update-ticket-link.dto';
import { WhereTicketLinkDto } from '../dto/where-ticket-link.dto';
import { TicketLinkEntity } from '../entities/ticket-link.entity';

export const TICKET_LINK_TYPE_GATEWAY = 'TICKET_LINK_TYPE_GATEWAY';

export interface TicketLinkTypePrismaGateway {
    create(createTicketLinkDto: CreateTicketLinkDto): Promise<TicketLinkEntity>;
    findAll(skip: number, take: number, where?: WhereTicketLinkDto): Promise<PaginateTicketLinkOutputDto>;
    findOne(id: string, where?: WhereTicketLinkDto): Promise<TicketLinkEntity>;
    update(
        id: string,
        updateTicketLinkDto: UpdateTicketLinkDto,
        where?: WhereTicketLinkDto,
    ): Promise<TicketLinkEntity>;
    remove(id: string): Promise<boolean>;
}