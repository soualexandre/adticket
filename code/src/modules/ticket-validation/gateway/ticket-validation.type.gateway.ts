import { CreateTicketValidationDto } from '../dto/create-ticket-validation.dto';
import { PaginateTicketValidationOutputDto } from '../dto/paginate-ticket-link.dto';
import { UpdateTicketValidationDto } from '../dto/update-ticket-validation.dto';
import { WhereTicketValidationDto } from '../dto/where-ticket-link.dto';
import { TicketValidationsEntity } from '../entities/ticket-validation.entity';

export const TICKET_VALIDATION_TYPE_GATEWAY = 'TICKET_VALIDATION_TYPE_GATEWAY';

export interface TicketValidationTypePrismaGateway {
    create(createTicketValidationDto: CreateTicketValidationDto): Promise<TicketValidationsEntity>;
    findAll(skip: number, take: number, where?: WhereTicketValidationDto): Promise<PaginateTicketValidationOutputDto>;
    findOne(id: string, where?: WhereTicketValidationDto): Promise<TicketValidationsEntity>;
    update(
        id: string,
        updateTicketValidationDto: UpdateTicketValidationDto,
        where?: WhereTicketValidationDto,
    ): Promise<TicketValidationsEntity>;
    remove(id: string): Promise<boolean>;
}