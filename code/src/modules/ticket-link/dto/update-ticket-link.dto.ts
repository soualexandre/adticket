import { PartialType } from '@nestjs/swagger';
import { CreateTicketLinkDto } from './create-ticket-link.dto';

export class UpdateTicketLinkDto extends PartialType(CreateTicketLinkDto) {}
